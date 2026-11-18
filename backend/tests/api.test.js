const { test, describe } = require('node:test')
const assert = require('node:assert')
const { EventEmitter } = require('node:events')
const app = require('../server')

function makeRequest({ method = 'GET', url = '/', headers = {}, body = null }) {
  return new Promise((resolve, reject) => {
    const req = new EventEmitter()
    req.method = method
    req.url = url
    req.originalUrl = url
    req.ip = '127.0.0.1'
    req.socket = { remoteAddress: '127.0.0.1' }
    req.connection = { remoteAddress: '127.0.0.1' }
    req.headers = {
      'content-type': 'application/json',
      ...headers,
    }
    req.body = body

    let finished = false
    const res = new EventEmitter()
    res.statusCode = 200
    res.headers = {}

    res.setHeader = (k, v) => {
      res.headers[k.toLowerCase()] = v
    }
    res.getHeader = (k) => res.headers[k.toLowerCase()]
    res.getHeaders = () => res.headers
    res.getHeaderNames = () => Object.keys(res.headers)
    res.hasHeader = (k) => Boolean(res.headers[k.toLowerCase()])
    res.removeHeader = (k) => {
      delete res.headers[k.toLowerCase()]
    }

    res.status = (code) => {
      res.statusCode = code
      return res
    }
    res.cookie = () => res
    res.json = (data) => {
      if (!finished) {
        finished = true
        resolve({ status: res.statusCode, data })
      }
      return res
    }
    res.send = (data) => {
      if (!finished) {
        finished = true
        resolve({ status: res.statusCode, data })
      }
      return res
    }
    res.end = () => {
      if (!finished) {
        finished = true
        resolve({ status: res.statusCode, data: null })
      }
    }

    try {
      app.handle(req, res, (err) => {
        if (err && !finished) {
          finished = true
          reject(err)
        }
      })
    } catch (err) {
      if (!finished) {
        finished = true
        reject(err)
      }
    }
  })
}

describe('KP Tax Consultants Backend API Unit & Integration Tests', () => {
  test('GET / returns API service information', async () => {
    const res = await makeRequest({ method: 'GET', url: '/' })
    assert.strictEqual(res.status, 200)
    assert.strictEqual(res.data.success, true)
    assert.strictEqual(res.data.service, 'KP Tax Consultants API')
  })

  test('GET /api/profile returns consultant profile details', async () => {
    const res = await makeRequest({ method: 'GET', url: '/api/profile' })
    assert.strictEqual(res.status, 200)
    assert.strictEqual(res.data.success, true)
    assert.strictEqual(res.data.data.name, 'KP Pruthvi')
    assert.strictEqual(res.data.data.designation, 'Tax Consultant')
    assert.strictEqual(res.data.data.phone, '+91 70194 84928')
  })

  test('GET /api/services returns the 5 defined services', async () => {
    const res = await makeRequest({ method: 'GET', url: '/api/services' })
    assert.strictEqual(res.status, 200)
    assert.strictEqual(res.data.success, true)
    assert(res.data.count >= 5)
    const slugs = res.data.data.map((s) => s.slug)
    assert(slugs.includes('direct-tax'))
    assert(slugs.includes('indirect-tax'))
    assert(slugs.includes('compliance'))
    assert(slugs.includes('accounting'))
    assert(slugs.includes('company-registration'))
  })

  test('POST /api/enquiries rejects missing required fields', async () => {
    const res = await makeRequest({
      method: 'POST',
      url: '/api/enquiries',
      body: { name: 'A' },
    })
    assert.strictEqual(res.status, 400)
    assert.strictEqual(res.data.success, false)
  })

  test('POST /api/appointments rejects past dates', async () => {
    const res = await makeRequest({
      method: 'POST',
      url: '/api/appointments',
      body: {
        name: 'Test Client',
        phone: '+91 9876543210',
        service: 'Direct Tax',
        mode: 'online',
        preferred_method: 'Google Meet',
        appointment_date: '2020-01-01',
        appointment_time: '10:00 AM',
      },
    })
    assert.strictEqual(res.status, 400)
    assert.strictEqual(res.data.success, false)
    assert(res.data.message.includes('past') || res.data.errors)
  })

  test('POST /api/appointments rejects invalid consultation mode', async () => {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]
    const res = await makeRequest({
      method: 'POST',
      url: '/api/appointments',
      body: {
        name: 'Test Client',
        phone: '+91 9876543210',
        service: 'Direct Tax',
        mode: 'flying-carrier-pigeon',
        preferred_method: 'Pigeon',
        appointment_date: tomorrow,
        appointment_time: '10:00 AM',
      },
    })
    assert.strictEqual(res.status, 400)
    assert.strictEqual(res.data.success, false)
  })

  test('Protected endpoint GET /api/leads rejects unauthenticated request with 401', async () => {
    const res = await makeRequest({ method: 'GET', url: '/api/leads' })
    assert.strictEqual(res.status, 401)
    assert.strictEqual(res.data.success, false)
  })

  test('Protected endpoint GET /api/dashboard/summary rejects unauthenticated request with 401', async () => {
    const res = await makeRequest({ method: 'GET', url: '/api/dashboard/summary' })
    assert.strictEqual(res.status, 401)
  })

  test('Protected endpoint GET /api/appointments rejects unauthenticated request with 401', async () => {
    const res = await makeRequest({ method: 'GET', url: '/api/appointments' })
    assert.strictEqual(res.status, 401)
  })

  test('Protected endpoint GET /api/notifications rejects unauthenticated request with 401', async () => {
    const res = await makeRequest({ method: 'GET', url: '/api/notifications' })
    assert.strictEqual(res.status, 401)
  })

  test('Protected endpoint GET /api/settings rejects unauthenticated request with 401', async () => {
    const res = await makeRequest({ method: 'GET', url: '/api/settings' })
    assert.strictEqual(res.status, 401)
  })

  test('POST /api/auth/login rejects empty credentials', async () => {
    const res = await makeRequest({
      method: 'POST',
      url: '/api/auth/login',
      body: { email: '', password: '' },
    })
    assert.strictEqual(res.status, 400)
    assert.strictEqual(res.data.success, false)
  })
})
