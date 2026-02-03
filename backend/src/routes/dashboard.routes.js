import { getUserStats } from "../controllers/dashboard.controller.js";
import express from "express";

const router = express.Router();

router.get("/total-users", getUserStats);

export default router;
