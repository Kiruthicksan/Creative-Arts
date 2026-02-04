import express from "express";
import { getProfile, getAllUsers } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.get("/all", getAllUsers);

export default router;
