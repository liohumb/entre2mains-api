import express from 'express'
import {deleteUser, getNewUsers} from '../controllers/newUsers.js'

const router = express.Router()

/* GET */
router.get('/:token', getNewUsers)
router.delete('/:email', deleteUser)

export default router