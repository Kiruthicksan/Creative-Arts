import express from "express";
import { uploadFile } from "../controllers/upload.controller.js";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
;

const router = express.Router();

router.post("/signature", authMiddleware, uploadFile);

export default router;