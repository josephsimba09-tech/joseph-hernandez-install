from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class BookingInquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    event_type: str
    event_date: Optional[str] = None
    budget: Optional[str] = None
    location: Optional[str] = None
    details: Optional[str] = None
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class BookingInquiryCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    event_type: str
    event_date: Optional[str] = None
    budget: Optional[str] = None
    location: Optional[str] = None
    details: Optional[str] = None


class BookingInquiryResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str]
    event_type: str
    event_date: Optional[str]
    budget: Optional[str]
    location: Optional[str]
    details: Optional[str]
    status: str
    created_at: str


# Routes
@api_router.get("/")
async def root():
    return {"message": "Pro AV Tech API - Event Technology Services"}


@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Pro AV Tech API"}


@api_router.post("/bookings", response_model=BookingInquiryResponse)
async def create_booking_inquiry(input: BookingInquiryCreate):
    """Create a new booking inquiry"""
    inquiry_data = input.model_dump()
    inquiry_obj = BookingInquiry(**inquiry_data)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = inquiry_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.bookings.insert_one(doc)
    
    # Log the new inquiry for notifications
    logging.info(f"New booking inquiry from {inquiry_obj.name} ({inquiry_obj.email}) - Event: {inquiry_obj.event_type}")
    
    return BookingInquiryResponse(
        id=doc['id'],
        name=doc['name'],
        email=doc['email'],
        phone=doc.get('phone'),
        event_type=doc['event_type'],
        event_date=doc.get('event_date'),
        budget=doc.get('budget'),
        location=doc.get('location'),
        details=doc.get('details'),
        status=doc['status'],
        created_at=doc['created_at']
    )


@api_router.get("/bookings", response_model=List[BookingInquiryResponse])
async def get_booking_inquiries():
    """Get all booking inquiries"""
    bookings = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    return [
        BookingInquiryResponse(
            id=b['id'],
            name=b['name'],
            email=b['email'],
            phone=b.get('phone'),
            event_type=b['event_type'],
            event_date=b.get('event_date'),
            budget=b.get('budget'),
            location=b.get('location'),
            details=b.get('details'),
            status=b.get('status', 'new'),
            created_at=b['created_at']
        )
        for b in bookings
    ]


@api_router.get("/bookings/{booking_id}", response_model=BookingInquiryResponse)
async def get_booking_inquiry(booking_id: str):
    """Get a specific booking inquiry"""
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking inquiry not found")
    
    return BookingInquiryResponse(
        id=booking['id'],
        name=booking['name'],
        email=booking['email'],
        phone=booking.get('phone'),
        event_type=booking['event_type'],
        event_date=booking.get('event_date'),
        budget=booking.get('budget'),
        location=booking.get('location'),
        details=booking.get('details'),
        status=booking.get('status', 'new'),
        created_at=booking['created_at']
    )


@api_router.patch("/bookings/{booking_id}/status")
async def update_booking_status(booking_id: str, status: str):
    """Update booking inquiry status"""
    result = await db.bookings.update_one(
        {"id": booking_id},
        {"$set": {"status": status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking inquiry not found")
    
    return {"message": "Status updated successfully", "status": status}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
