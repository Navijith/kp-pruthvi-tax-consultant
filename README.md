# KP Tax Consultants — Production Platform & CRM

Complete, responsive financial consultancy website, appointment booking engine, and secure administrative CRM built for **KP Tax Consultants** (`KP Pruthvi, Tax Consultant, CA Intermediate`).

---

## 1. Business Profile & Contact Details

- **Business Name**: KP Tax Consultants
- **Consultant**: KP Pruthvi
- **Designation**: Tax Consultant
- **Qualification**: CA Intermediate *(Accurately presented per regulatory guidance; never described as Chartered Accountant)*
- **Experience**: 5 years *(Marked as subject to client confirmation)*
- **Location**: Bengaluru, Karnataka, India
- **Office Address**: 144, 9th Cross, 2nd Phase, Sainagar, MS Palya, Vidyaranyapura Post, Bengaluru, Karnataka 560097
- **Phone**: [+91 70194 84928](tel:+917019484928)
- **WhatsApp**: [+91 70194 84928](https://wa.me/917019484928)
- **Email**: [pruthvigowda003@gmail.com](mailto:pruthvigowda003@gmail.com)
- **Working Hours**: 6 days a week • 9:00 AM – 8:00 PM

---

## 2. Core Practice Services

1. **Direct Tax**: Income Tax Return (ITR) preparation & filing, advance tax planning, notice assistance.
2. **Indirect Tax**: GST new registrations, monthly/quarterly GSTR-1 & GSTR-3B filings, input tax credit reconciliation, and Excise Duty assistance where applicable.
3. **Compliance**: Routine statutory deadline tracking and business regulatory upkeep.
4. **Accounting**: Bookkeeping, journal ledgers, financial statement preparation, and account reviews.
5. **Company Registration**: Incorporation guidance for Private Limited, LLP, Partnership, and Sole Proprietorship structures.

---

## 3. Technology Architecture

- **Frontend**: React 19, Vite 8, Tailwind CSS v4, React Router v7 with dynamic code-splitting (`React.lazy`), Framer Motion, Lucide React, Recharts.
- **Backend**: Node.js v22, Express.js, PostgreSQL with connection pooling (`pg.Pool`), Helmet security headers, CORS with credentials, rate limiters (`express-rate-limit`), Zod validation schemas.
- **Security**: HttpOnly SameSite authentication cookies, JWT with 8-hour expiration, bcrypt password hashing (12 rounds), parameter-sanitized SQL queries.
- **Automated Tests**: Built-in test suite using Node.js native test runner (`node:test`).

---

## 4. Local Installation & Setup Guide

### Prerequisites
- Node.js v18 or later (v22 recommended)
- PostgreSQL 14+ running locally or on a cloud provider (e.g. Supabase, AWS RDS, Neon)

### Step 1: Clone and Configure Environment

#### Backend Configuration:
Copy `backend/.env.example` to `backend/.env`:
```bash
cd backend
cp .env.example .env
```
Populate the values in `backend/.env`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/kp_pruthvi
JWT_SECRET=generate_a_secure_random_string_with_at_least_32_characters
FRONTEND_URL=http://localhost:5173
ADMIN_PASSWORD=your_secure_admin_password_min_8_chars
NOTIFY_EMAIL=pruthvigowda003@gmail.com
NOTIFY_WHATSAPP=917019484928
```

#### Frontend Configuration:
Create `frontend/.env` (optional for local dev; defaults to `http://localhost:5000/api`):
```env
VITE_API_URL=http://localhost:5000/api
```

---

### Step 2: Database Migration & Admin Setup

1. Create the database in PostgreSQL if it does not already exist:
   ```sql
   CREATE DATABASE kp_pruthvi;
   ```

2. Run the automated migration runner:
   ```bash
   cd backend
   npm run migrate
   ```
   *(Executes `001_initial_schema.sql`, `002_appointments.sql`, and `002_kp_pruthvi_content.sql`)*

3. Seed the initial Administrator account:
   ```bash
   npm run seed:admin
   ```
   *(Creates admin user with email `admin@kppruthvi.com` and the password specified in `ADMIN_PASSWORD`)*

---

### Step 3: Run the Development Servers

#### Terminal 1 — Start Backend Server:
```bash
cd backend
npm run dev
# Server running at http://localhost:5000
```

#### Terminal 2 — Start Frontend Application:
```bash
cd frontend
npm run dev
# Frontend accessible at http://localhost:5173
```

---

## 5. Running Automated Tests

Run the backend test suite:
```bash
cd backend
npm test
```
Tests verify public endpoints, validation schemas (past-date rejection, phone validation), authentication middleware, and administrative route protections.

Run the frontend production build:
```bash
cd frontend
npm run build
```

---

## 6. Consultant Notifications & Google Workspace Domain Integration

### How Notifications Work
1. **In-App Notification**: Every new enquiry or appointment request is immediately recorded in the PostgreSQL `notifications` table and appears with an unread badge on the Admin CRM header.
2. **WhatsApp Alert**: A prefilled direct-action link is generated for the consultant (+91 70194 84928) with the client's name, phone, service, and date/time.
3. **Email Notification**: Prepared for dispatch to `pruthvigowda003@gmail.com`.

### Connecting to Custom Domain & Google Workspace
When you are ready to point your custom domain (e.g., `kptaxconsultants.com`):
1. **DNS A / CNAME Records**: Point your domain to your production hosting server (e.g. Vercel / Netlify for frontend, Railway / Render / DigitalOcean for backend).
2. **Google Workspace MX Records**: Add the standard Google Workspace MX records to your domain DNS:
   - `ASPMX.L.GOOGLE.COM` (Priority 1)
   - `ALT1.ASPMX.L.GOOGLE.COM` (Priority 5)
   - `ALT2.ASPMX.L.GOOGLE.COM` (Priority 5)
   - `ALT3.ASPMX.L.GOOGLE.COM` (Priority 10)
   - `ALT4.ASPMX.L.GOOGLE.COM` (Priority 10)
3. **Google Workspace SMTP Setup**: Once domain email is active (e.g. `info@yourdomain.com`), configure `backend/.env`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=info@yourdomain.com
   SMTP_PASS=your_google_workspace_app_password
   ```

---

## 7. Administrative CRM Modules

Access the CRM at `/admin/login` or via the discreet link in the footer:
- **Dashboard (`/admin/dashboard`)**: Aggregated metrics, pipeline conversion charts, recent enquiries, upcoming appointments, and overdue tasks.
- **Leads Management (`/admin/leads`)**: Search, filter by status (`new`, `contacted`, `interested`, `client`), filter by priority, sort, and open lead details.
- **Lead Profile (`/admin/leads/:id`)**: Comprehensive client record, status/priority updaters, timeline of past activities, internal notes form, follow-up scheduler, and quick Call/WhatsApp/Email buttons.
- **Appointments (`/admin/appointments`)**: Review consultation requests, filter by mode (`online`, `offline`) and status, confirm slots, mark completed, or cancel.
- **Follow-ups (`/admin/follow-ups`)**: View overdue, today's, upcoming, and completed tasks; create new follow-ups linked to any lead.
- **Notifications (`/admin/notifications`)**: Central in-app notification center with read/unread tracking.
- **Settings (`/admin/settings`)**: Edit practice details, consultant credentials, contact numbers, and working hours without code changes.

---

## 8. Security & Compliance Checklist

- [x] Administrative endpoints protected with JWT middleware.
- [x] HttpOnly, SameSite cookie authentication with Bearer token compatibility.
- [x] Dedicated rate limiting for login attempts (brute-force defense).
- [x] Rate limiting for public enquiry and appointment submissions (anti-spam).
- [x] Helmet security headers configured.
- [x] CORS restricted to authorized frontend origin.
- [x] Parameterized SQL queries preventing SQL injection.
- [x] ACID database transactions for simultaneous lead and appointment creation.
- [x] Sensitive financial document uploads (PAN/Aadhaar) excluded from public forms.
- [x] Consultant qualification verified as CA Intermediate; no unsupported claims.
