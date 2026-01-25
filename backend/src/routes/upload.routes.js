import express from "express";
import { uploadFile } from "../controllers/upload.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/signature", authMiddleware, uploadFile);

export default router;