import express from 'express'
import { getParadas } from '../controllers/paradas-controller.js'

const router = express.Router()

router.get('/', getParadas)

export default router