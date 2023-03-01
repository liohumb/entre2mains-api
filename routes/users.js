import express from 'express'
import { getUser, getArtisans, addRemoveArtisan } from '../controllers/users.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* GET */
router.get('/:id', verifyToken, getUser)
router.get('/:id/artisan', verifyToken, getArtisans)

/* UPDATE */
router.patch('/:id/:artisan', verifyToken, addRemoveArtisan)

export default router