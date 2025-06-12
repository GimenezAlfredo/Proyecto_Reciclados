import express from 'express'
import { createUser, showUser } from '../controllers/user.js'

const router = express.Router()

router.post("/create", createUser)
router.get("/showList", showUser)

export default router