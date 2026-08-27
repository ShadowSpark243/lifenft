import { Hono } from 'hono'
import { cors } from 'hono/cors'
import authRoutes from './routes/authRoutes.js'
import donationRoutes from './routes/donationRoutes.js'

const app = new Hono()

// Apply CORS middleware
app.use('*', cors({
  origin: ['http://localhost:3000', 'https://lifenft.vercel.app', 'https://lifenft-isvi2uic3-shadowsparks-projects.vercel.app/'],
  credentials: true,
}))

// Mount routes
app.route('/auth', authRoutes)
app.route('/donations', donationRoutes)

export default app
