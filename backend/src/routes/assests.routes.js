import express from "express";
import {
  createAssest,
  getAssests,
  getAssetsById,
  updateAssest,
} from "../controllers/assests.controller.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();
router.get("/", getAssests);
router.get("/:id", getAssetsById);
router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "downloadFile", maxCount: 1 },
  ]),
  createAssest,
);
router.put("/:id", upload.fields([
    { name: "images", maxCount: 10 },
    { name: "downloadFile", maxCount: 1 },
  ]), updateAssest);
export default router;
