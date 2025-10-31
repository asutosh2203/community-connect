import { Router } from "express";
import authEndpoints from "./auth.endpoint.js";

const router = Router();

router.use("/auth", authEndpoints);

export default router;
