from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'josephh590@yahoo.com')

# Try to import resend
try:
    import resend
    resend.api_key = RESEND_API_KEY
    RESEND_AVAILABLE = True
except ImportError:
    RESEND_AVAILABLE = False
    logging.warning("Resend library not available - email notifications disabled")

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
    
    @field_validator('name')
    @classmethod
    def name_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Name is required')
        return v.strip()
    
    @field_validator('email')
    @classmethod
    def email_valid(cls, v):
        if not v or not v.strip():
            raise ValueError('Email is required')
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, v.strip()):
            raise ValueError('Invalid email format')
        return v.strip()
    
    @field_validator('event_type')
    @classmethod
    def event_type_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Event type is required')
        return v.strip()


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


# Email notification helper
async def send_booking_notification(booking: dict):
    """Send email notification for new booking"""
    if not RESEND_AVAILABLE or not RESEND_API_KEY:
        logging.info(f"Email notification skipped - RESEND_API_KEY not configured. New booking from: {booking.get('name')}")
        return None
    
    html_content = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #ededed;">
        <h1 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Booking Request!</h1>
        
        <div style="background-color: #121212; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <h2 style="color: #ffffff; margin-top: 0;">Contact Information</h2>
            <p><strong style="color: #a1a1aa;">Name:</strong> {booking.get('name', 'N/A')}</p>
            <p><strong style="color: #a1a1aa;">Email:</strong> <a href="mailto:{booking.get('email', '')}" style="color: #3b82f6;">{booking.get('email', 'N/A')}</a></p>
            <p><strong style="color: #a1a1aa;">Phone:</strong> {booking.get('phone', 'Not provided')}</p>
        </div>
        
        <div style="background-color: #121212; padding: 20px; border-left: 4px solid #22c55e; margin: 20px 0;">
            <h2 style="color: #ffffff; margin-top: 0;">Event Details</h2>
            <p><strong style="color: #a1a1aa;">Event Type:</strong> {booking.get('event_type', 'N/A')}</p>
            <p><strong style="color: #a1a1aa;">Event Date:</strong> {booking.get('event_date', 'Not specified')}</p>
            <p><strong style="color: #a1a1aa;">Location:</strong> {booking.get('location', 'Not specified')}</p>
            <p><strong style="color: #a1a1aa;">Budget:</strong> {booking.get('budget', 'Not specified')}</p>
        </div>
        
        <div style="background-color: #121212; padding: 20px; margin: 20px 0;">
            <h2 style="color: #ffffff; margin-top: 0;">Additional Details</h2>
            <p style="color: #d4d4d8;">{booking.get('details', 'No additional details provided.')}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #27272a;">
            <p style="color: #71717a; font-size: 12px;">This notification was sent from your Joseph Hernandez I&D Specialist website.</p>
        </div>
    </div>
    """
    
    params = {
        "from": SENDER_EMAIL,
        "to": [NOTIFICATION_EMAIL],
        "subject": f"New Booking: {booking.get('event_type', 'Event')} - {booking.get('name', 'Unknown')}",
        "html": html_content
    }
    
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        logging.info(f"Email notification sent successfully: {email.get('id')}")
        return email
    except Exception as e:
        logging.error(f"Failed to send email notification: {str(e)}")
        return None


# Routes
@api_router.get("/")
async def root():
    return {"message": "Pro AV Tech API - Event Technology Services"}


@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Pro AV Tech API"}


@api_router.post("/bookings", response_model=BookingInquiryResponse, status_code=status.HTTP_201_CREATED)
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
    
    # Send email notification (non-blocking)
    asyncio.create_task(send_booking_notification(doc))
    
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
