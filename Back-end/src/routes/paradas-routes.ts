import express, { Router } from "express";
import { getParadas } from "../controllers/paradas-controller.js";
import { verifyToken } from "../middlewares/verify-token.js";

const router: Router = express.Router();

router.get("/", verifyToken, getParadas);

export default router;
