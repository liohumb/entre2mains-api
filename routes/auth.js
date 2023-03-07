import express from 'express'
import { login, check } from '../controllers/auth.js'

const router = express.Router()

router.post('/login', login)
router.post('/check-email', check)

export default router