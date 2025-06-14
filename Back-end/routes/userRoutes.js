import express from 'express'
import { createUser, deleteUser, editUser, showUser, getUsersWithCoords } from '../controllers/user.js'

const router = express.Router()

router.post("/create", createUser)
router.get("/showList", showUser)
router.post("/editUser/:id", editUser)
router.post("/deleteUser/:id", deleteUser)
router.get('/con-coordenadas', getUsersWithCoords)


export default router