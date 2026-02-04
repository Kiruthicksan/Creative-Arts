import express from "express";
import {
  createAsset,
  getAssets,
  getAssetsById,
  updateAsset,
  deleteAsset,
} from "../controllers/assets.controller.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();
router.get("/", getAssets);
router.get("/:id", getAssetsById);
router.post(
  "/",
  upload.fields([
    { name: "previewImages", maxCount: 10 },
    { name: "downloadFile", maxCount: 1 },
  ]),
  createAsset,
);
router.put(
  "/:id",
  upload.fields([
    { name: "previewImages", maxCount: 10 },
    { name: "downloadFile", maxCount: 1 },
  ]),
  updateAsset,
);
router.delete("/:id", deleteAsset);
export default router;
