import { Hono } from 'hono'
import { login, register, logout, getUserProfile } from '../controllers/authController.js'

const auth = new Hono()

auth.post('/login', login)
auth.post('/register', register)
auth.post('/logout', logout)
auth.get('/profile/:role/:userId', getUserProfile)

export default auth
