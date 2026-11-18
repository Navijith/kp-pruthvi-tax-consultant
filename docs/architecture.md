# KP Tax Consultants — System Architecture & Implementation

## 1. Executive Summary
This document specifies the software architecture, database design, API specification, security controls, and operational workflows for **KP Tax Consultants** (`KP Pruthvi, Tax Consultant, CA Intermediate`).

The platform consists of two integrated tiers:
1. **Public Practice Website**: A high-trust, responsive client portal designed for individuals, professionals, and businesses to explore direct tax, indirect tax (GST), compliance, accounting, and business registration services, request consultations, and contact the consultant directly.
2. **Administrative CRM & Task Center**: A secure, authenticated back-office application enabling the consultant to manage incoming enquiries, confirm appointment requests, track leads across pipeline stages, schedule follow-ups, and configure business settings.

---

## 2. Technology Stack & Architectural Principles

### Frontend
- **Framework**: React 19 with Vite 8
- **Styling**: Tailwind CSS v4 with custom brand tokens (Deep Navy `#122438`, Warm Ivory `#FBFAF6`, Muted Gold `#A77D2F`, Soft Gold `#F2E8CF`, Muted Green `#2C5A4D`)
- **Routing & Code-Splitting**: React Router v7 with `React.lazy()` dynamic route splitting for sub-500kB production chunks
- **Icons & Motion**: Lucide React & Framer Motion
- **Data Visualization**: Recharts for pipeline funnel distribution
- **Validation**: Zod schema validation
- **HTTP Client**: Axios with interceptors, credentials handling (`withCredentials: true`), and automatic session expiry redirects

### Backend
- **Runtime**: Node.js v22 (LTS) & Express.js
- **Database**: PostgreSQL 18 with connection pooling (`pg.Pool`), parameterized queries, and ACID transactions
- **Security & Headers**: Helmet with custom CSP/cross-origin policies, CORS with origin whitelisting and credentials
- **Authentication**: Stateless JSON Web Tokens (JWT) stored in secure, HttpOnly, SameSite cookies with Bearer token fallback
- **Password Hashing**: bcryptjs with 12 salt rounds
- **Rate Limiting**: `express-rate-limit` with specialized tiers (Login brute-force limiter, Public submission limiter, General API limiter)
- **Validation**: Zod schemas for all request payloads
- **Testing**: Built-in Node.js native test runner (`node:test` and `node:assert`)

---

## 3. Data Flow & Transaction Architecture

```
[ Visitor / Client ]
        │
        ├── Submits Enquiry / Request ──▶ [ Zod Request Validation ]
        │                                             │
        │                                    [ ACID Transaction ]
        │                                             ├──▶ INSERT INTO leads
        │                                             └──▶ INSERT INTO appointments
        │                                             │
        ├── Generates Ref: KP-XXXXXX ◀────────────────┘
        │
        └── Triggers Notifications:
                 ├── In-App Notification (PostgreSQL `notifications` table)
                 ├── WhatsApp Direct Click Link (https://wa.me/917019484928)
                 └── Prepared Email Alert (to pruthvigowda003@gmail.com / domain email)
```

### ACID Transaction for Appointments
When an appointment is requested:
1. Begins a database transaction (`BEGIN`).
2. Creates a corresponding record in `leads` (source: `'appointment'`, status: `'new'`, priority: `'high'`, score: `85`).
3. Creates a corresponding record in `appointments` linked by `lead_id` with a unique reference code (`KP-XXXXXX`).
4. Commits both operations (`COMMIT`). If either operation fails, both are rolled back (`ROLLBACK`).

---

## 4. Database Schema Overview

### Core Tables
1. **`users`**: Administrative credentials (`id`, `full_name`, `email`, `password_hash`, `role`, `is_active`, `created_at`, `updated_at`).
2. **`profile`**: Consultant details (`name`, `designation`, `phone`, `whatsapp`, `email`, `address`, `city`, `state`, `pincode`, `bio`).
3. **`services`**: Core offerings (`id`, `name`, `slug`, `short_description`, `description`, `is_active`, `display_order`).
4. **`leads`**: Central CRM records (`id`, `name`, `company_name`, `phone`, `email`, `source`, `status`, `priority`, `score`, `notes`, `contacted_at`, `created_at`).
5. **`appointments`**: Consultation bookings (`id`, `lead_id`, `reference_code`, `name`, `phone`, `email`, `service`, `mode`, `preferred_method`, `appointment_date`, `appointment_time`, `status`).
6. **`follow_ups`**: Scheduled tasks (`id`, `lead_id`, `scheduled_at`, `status`, `notes`, `completed_at`).
7. **`contact_history`**: Audit trail (`id`, `lead_id`, `contact_type`, `notes`, `contacted_at`).
8. **`notifications`**: System alerts (`id`, `user_id`, `title`, `message`, `type`, `is_read`, `created_at`).
9. **`settings`**: Dynamic key-value configuration (`id`, `key`, `value`, `updated_at`).

---

## 5. Security & Privacy Controls
- **Zero Raw Error Leaks**: The centralized error handler strips database internals and stack traces in production.
- **No Document Uploads on Public Forms**: Public forms only collect essential contact and requirement details.
- **Strict Role-Based Access Control**: All administrative endpoints (`/api/leads`, `/api/appointments`, `/api/dashboard`, `/api/follow-ups`, `/api/settings`, `/api/notifications`) require JWT authentication and an `'admin'` role.
- **HttpOnly Cookies**: Prevents Cross-Site Scripting (XSS) from reading authentication session tokens.
