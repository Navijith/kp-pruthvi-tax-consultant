const { z } = require('zod')

const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(150),
  phone: z.string().regex(phoneRegex, 'Please provide a valid contact number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  service: z.string().max(100).optional().default('General Tax Enquiry'),
  message: z.string().min(5, 'Please provide a brief description of your requirement').max(2000),
})

const appointmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(150),
  phone: z.string().regex(phoneRegex, 'Please provide a valid contact number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  service: z.string().max(150).optional().default('Direct Tax Consultation'),
  mode: z.enum(['online', 'offline'], {
    errorMap: () => ({ message: 'Consultation mode must be online or offline' }),
  }).default('online'),
  preferred_method: z.string().max(50).optional().default('Google Meet'),
  appointment_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be formatted as YYYY-MM-DD').refine((val) => {
    const today = new Date().toISOString().split('T')[0]
    return val >= today
  }, { message: 'Appointment date cannot be in the past' }).optional().default(() => new Date().toISOString().split('T')[0]),
  appointment_time: z.string().max(50).optional().default('Flexible / Earliest Available'),
  duration_minutes: z.union([z.number(), z.string()]).transform((val) => Number(val) || 15).optional().default(15),
  message: z.string().max(2000).optional().or(z.literal('')),
})

const leadUpdateSchema = z.object({
  status: z.enum(['new', 'contacted', 'interested', 'client']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  notes: z.string().max(4000).optional(),
})

const leadNoteSchema = z.object({
  notes: z.string().min(1, 'Note content cannot be empty').max(2000),
  contact_type: z.enum(['call', 'whatsapp', 'email', 'meeting', 'note']).default('note'),
})

const appointmentStatusSchema = z.object({
  status: z.enum(['requested', 'confirmed', 'completed', 'cancelled']),
})

const followUpSchema = z.object({
  lead_id: z.string().uuid('Valid Lead ID is required'),
  scheduled_at: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?)?/)),
  notes: z.string().max(1000).optional(),
})

const followUpUpdateSchema = z.object({
  status: z.enum(['pending', 'completed', 'rescheduled', 'cancelled']).optional(),
  notes: z.string().max(1000).optional(),
  scheduled_at: z.string().optional(),
})

const settingsSchema = z.object({
  business_name: z.string().min(1).max(200).optional(),
  consultant_name: z.string().min(1).max(150).optional(),
  designation: z.string().max(150).optional(),
  qualification: z.string().max(150).optional(),
  phone: z.string().max(30).optional(),
  whatsapp: z.string().max(30).optional(),
  email: z.string().email().optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  pincode: z.string().max(20).optional(),
  hours: z.string().max(100).optional(),
  bio: z.string().max(2000).optional(),
  services: z.array(z.any()).optional(),
  experience: z.string().optional(),
})

module.exports = {
  loginSchema,
  enquirySchema,
  appointmentSchema,
  leadUpdateSchema,
  leadNoteSchema,
  appointmentStatusSchema,
  followUpSchema,
  followUpUpdateSchema,
  settingsSchema,
}
