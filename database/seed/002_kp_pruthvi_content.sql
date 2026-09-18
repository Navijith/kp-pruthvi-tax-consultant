-- Client-provided public profile content.
-- Run after 001_initial_schema.sql.

UPDATE profile
SET
  name = 'KP Pruthvi',
  designation = 'Tax Consultant',
  phone = '+91 70194 84928',
  whatsapp = '+91 70194 84928',
  email = 'pruthvigowda003@gmail.com',
  address = '144, 9th Cross, 2nd Phase, Sainagar, MS Palya, Vidyaranyapura Post',
  city = 'Bengaluru',
  state = 'Karnataka',
  pincode = '560097',
  country = 'India',
  latitude = NULL,
  longitude = NULL,
  bio = 'Tax Consultant and CA Intermediate candidate with 5 years of working experience, providing direct tax (Income Tax), indirect tax (GST and Excise Duty), compliance, accounting and company registration support.'
WHERE id = (SELECT id FROM profile ORDER BY created_at ASC LIMIT 1);

INSERT INTO profile (name, designation, phone, whatsapp, email, address, city, state, pincode, country, bio)
SELECT
  'KP Pruthvi',
  'Tax Consultant',
  '+91 70194 84928',
  '+91 70194 84928',
  'pruthvigowda003@gmail.com',
  '144, 9th Cross, 2nd Phase, Sainagar, MS Palya, Vidyaranyapura Post',
  'Bengaluru',
  'Karnataka',
  '560097',
  'India',
  'Tax Consultant and CA Intermediate candidate with 5 years of working experience, providing direct tax (Income Tax), indirect tax (GST and Excise Duty), compliance, accounting and company registration support.'
WHERE NOT EXISTS (SELECT 1 FROM profile);

INSERT INTO services (name, slug, short_description, description, display_order)
VALUES
  ('Direct Tax', 'direct-tax', 'Income Tax support', 'Support for income-tax related requirements for individuals, professionals and businesses.', 1),
  ('Indirect Tax', 'indirect-tax', 'GST and Excise Duty support', 'Support for GST and other indirect-tax requirements, including Excise Duty where applicable.', 2),
  ('Compliance', 'compliance', 'Routine compliance support', 'Structured assistance with recurring tax and business compliance requirements.', 3),
  ('Accounting', 'accounting', 'Accounting and bookkeeping support', 'Organized accounting assistance for clear and maintainable financial records.', 4),
  ('Company Registration', 'company-registration', 'Business registration support', 'Guidance and documentation support for company registration requirements.', 5)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  display_order = EXCLUDED.display_order,
  is_active = TRUE,
  updated_at = NOW();
