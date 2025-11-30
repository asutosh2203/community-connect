import { Router } from "express";
import {
  register,
  login,
  getMe,
  logout,
} from "../controllers/auth.controller.js";

const router = Router();

// /api/auth/<route>
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getme", getMe);

export default router;
