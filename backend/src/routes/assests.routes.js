import express from "express";
import { createAssest, getAssests, getAssetsById } from "../controllers/assests.controller.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();
router.get("/", getAssests);
router.get("/:id", getAssetsById);
router.post("/", upload.array("images", 10), createAssest);
export default router;
