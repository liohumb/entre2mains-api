import express from 'express'
import { login, check, signupEmail } from '../controllers/auth.js'

const router = express.Router()

router.post('/signup-email', signupEmail)
router.post('/login', login)
router.post('/check-email', check)

export default router