import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.controller.js";

const router = Router();

// /api/auth/<route>
router.post("/register", register);
router.post("/login", login);
router.get("/getme", getMe);

export default router;
