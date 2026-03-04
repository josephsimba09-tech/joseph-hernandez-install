# Pro AV Tech - Professional Event Technology Services

## Original Problem Statement
User is an independent tech professional for trade shows, events, stages, video walls, private events, conventions, and high security events. Works across multiple states. Needs a professional landing page to share via business card where clients can message and book services with notification capability.

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI components
- **Backend**: FastAPI with MongoDB
- **Theme**: Dark & sleek professional tech vibe
- **Typography**: Barlow Condensed (headings), Manrope (body), JetBrains Mono (labels)

## User Personas
1. **Event Planners** - Corporate and private event organizers
2. **Trade Show Managers** - Convention and trade show coordinators
3. **Corporate Clients** - Companies needing AV/stage for presentations
4. **Security Event Organizers** - High-security event planners

## Core Requirements (Static)
- [x] Professional landing page
- [x] Hero section with impactful branding
- [x] Services showcase (bento grid)
- [x] Portfolio gallery
- [x] About section with stats
- [x] Contact/booking form
- [x] Form validation (name, email, event type)
- [x] MongoDB storage for inquiries
- [x] Toast notifications
- [x] Mobile responsive design
- [x] Mobile sticky CTA

## What's Been Implemented
**January 2026**
- Full landing page with hero, services, portfolio, about, contact, footer sections
- Backend API: POST/GET /api/bookings with validation
- Dark theme with Barlow Condensed + Manrope fonts
- Shadcn UI components (calendar, select, toast via sonner)
- Form validation for email format and required fields
- Data-testid attributes for all interactive elements

## API Endpoints
- `GET /api/health` - Health check
- `POST /api/bookings` - Create booking inquiry (201 Created)
- `GET /api/bookings` - List all bookings
- `GET /api/bookings/{id}` - Get specific booking
- `PATCH /api/bookings/{id}/status` - Update booking status

## Prioritized Backlog
### P0 (Critical - Done)
- [x] Landing page MVP
- [x] Contact form with database storage
- [x] Input validation

### P1 (Important - Future)
- [ ] Email notification integration (SendGrid/Resend)
- [ ] Admin dashboard to manage bookings
- [ ] SMS notifications via Twilio

### P2 (Nice to Have)
- [ ] Real portfolio images upload
- [ ] Client testimonials section
- [ ] Blog/news section
- [ ] Calendar availability view
- [ ] QR code generator for business card

## Next Tasks
1. Add email notification when form is submitted
2. Create admin dashboard to view/manage booking inquiries
3. Implement booking status workflow (new → contacted → confirmed → completed)
