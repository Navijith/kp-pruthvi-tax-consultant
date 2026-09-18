# KP Tax Consultants — Website + Appointment + CRM

Professional public website and lightweight admin backend for **KP Tax Consultants**, led individually by **KP Pruthvi (Tax Consultant, CA Intermediate)**.

## Public site

- Home / About / Services / Contact / Location
- Professional navy, ivory and muted-gold visual system
- Responsive mobile navigation
- Click-to-call and WhatsApp actions
- Google Maps location embed using the practice address
- Free 15-minute appointment request flow
- Online consultation: Google Meet / Zoom / WhatsApp / Phone
- In-person consultation: office appointment request
- Enquiries and appointment requests stored in PostgreSQL

## Admin

- Existing admin authentication
- Lead viewing foundation
- Appointment request list
- Appointment status updates: requested / confirmed / completed / cancelled

## Database

Run migrations in order:

1. `database/migrations/001_initial_schema.sql`
2. `database/migrations/002_appointments.sql`
3. `database/seed/002_kp_pruthvi_content.sql`

## Environment

Copy `backend/.env.example` to `backend/.env` and set real PostgreSQL credentials and a long random JWT secret.

**Never commit `backend/.env` or any other secret file.** Rotate the credentials that were previously present in the original ZIP before deployment.

For the frontend, set `VITE_API_URL` when the API is not hosted at the default local URL.

Example:

`VITE_API_URL=https://api.example.com/api`

## Client photo / logo

The new UI includes a photo-ready professional profile area. Add the client's supplied professional photograph as:

`frontend/public/pruthvi.jpg`

The current project did not contain the client's actual photograph or logo artwork, so the redesigned site uses a clean monogram placeholder rather than inventing either asset.

## Appointment behavior

The website **requests** a date/time; it does not claim that the slot is instantly available. The practice confirms the request directly. This avoids showing false real-time availability until a real calendar/availability integration is connected.
