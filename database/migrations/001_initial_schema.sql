CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- USERS
-- ==========================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'admin',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- PROFILE
-- ==========================================

CREATE TABLE IF NOT EXISTS profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(150) NOT NULL,
    designation VARCHAR(150) NOT NULL,

    phone VARCHAR(30),
    whatsapp VARCHAR(30),
    email VARCHAR(255),

    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(20),
    country VARCHAR(100) DEFAULT 'India',

    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),

    bio TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- SERVICES
-- ==========================================

CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,

    short_description TEXT,
    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- BUSINESSES
-- ==========================================

CREATE TABLE IF NOT EXISTS businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    external_id VARCHAR(255),
    source VARCHAR(100),

    business_name VARCHAR(255) NOT NULL,
    category VARCHAR(150),

    phone VARCHAR(50),
    email VARCHAR(255),
    website TEXT,

    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(20),

    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),

    first_seen_at TIMESTAMPTZ,
    registration_date DATE,

    source_url TEXT,

    raw_data JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(source, external_id)
);

-- ==========================================
-- BUSINESS SOCIALS
-- ==========================================

CREATE TABLE IF NOT EXISTS business_socials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    business_id UUID NOT NULL
        REFERENCES businesses(id)
        ON DELETE CASCADE,

    platform VARCHAR(50) NOT NULL,
    profile_url TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(business_id, platform)
);

-- ==========================================
-- LEADS
-- ==========================================

CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    business_id UUID
        REFERENCES businesses(id)
        ON DELETE SET NULL,

    name VARCHAR(255),
    company_name VARCHAR(255),

    phone VARCHAR(50),
    email VARCHAR(255),

    source VARCHAR(100),

    status VARCHAR(50) NOT NULL DEFAULT 'new',

    priority VARCHAR(30) NOT NULL DEFAULT 'medium',

    score INTEGER NOT NULL DEFAULT 0,

    notes TEXT,

    contacted_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- FOLLOW UPS
-- ==========================================

CREATE TABLE IF NOT EXISTS follow_ups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    lead_id UUID NOT NULL
        REFERENCES leads(id)
        ON DELETE CASCADE,

    scheduled_at TIMESTAMPTZ NOT NULL,

    status VARCHAR(50) NOT NULL DEFAULT 'pending',

    notes TEXT,

    completed_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- CONTACT HISTORY
-- ==========================================

CREATE TABLE IF NOT EXISTS contact_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    lead_id UUID NOT NULL
        REFERENCES leads(id)
        ON DELETE CASCADE,

    contact_type VARCHAR(50) NOT NULL,

    notes TEXT,

    contacted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- NOTIFICATIONS
-- ==========================================

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID
        REFERENCES users(id)
        ON DELETE CASCADE,

    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,

    type VARCHAR(50) NOT NULL DEFAULT 'info',

    is_read BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- SETTINGS
-- ==========================================

CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    key VARCHAR(100) NOT NULL UNIQUE,
    value JSONB,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- INDEXES
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_businesses_location
ON businesses(latitude, longitude);

CREATE INDEX IF NOT EXISTS idx_businesses_first_seen
ON businesses(first_seen_at);

CREATE INDEX IF NOT EXISTS idx_leads_status
ON leads(status);

CREATE INDEX IF NOT EXISTS idx_leads_score
ON leads(score);

CREATE INDEX IF NOT EXISTS idx_follow_ups_scheduled
ON follow_ups(scheduled_at);

CREATE INDEX IF NOT EXISTS idx_notifications_read
ON notifications(is_read);