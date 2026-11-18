require('dotenv').config()
const { z } = require('zod')

const envSchema = z.object({
  PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().default('postgresql://postgres:postgres@localhost:5432/kp_pruthvi'),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters long').default('development_jwt_secret_key_minimum_32_characters_kp_tax'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  ADMIN_PASSWORD: z.string().optional(),
  // Email notification settings (e.g. for Google Workspace SMTP)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 587)),
  SMTP_SECURE: z.string().optional().transform((val) => val === 'true'),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  NOTIFY_EMAIL: z.string().default('pruthvigowda003@gmail.com'),
  NOTIFY_WHATSAPP: z.string().default('917019484928'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.format())
  // Only exit in production; in development allow safe defaults
  if (process.env.NODE_ENV === 'production') {
    process.exit(1)
  }
}

const env = parsed.success ? parsed.data : envSchema.parse({})

module.exports = env
