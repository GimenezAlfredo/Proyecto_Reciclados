import express from 'express'
import { createUser, deleteUser, editUser, showUser } from '../controllers/user.js'

const router = express.Router()

router.post("/create", createUser)
router.get("/showList", showUser)
router.post("/editUser/:id", editUser)
router.post("/deleteUser/:id", deleteUser)

export default router