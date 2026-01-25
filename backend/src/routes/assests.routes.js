import express from "express";
import { createAssest, getAssests } from "../controllers/assests.controller.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();
router.get("/", getAssests);
router.post("/", upload.single("image"), createAssest);
export default router;
