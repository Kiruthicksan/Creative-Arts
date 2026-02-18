import express from "express";

import {
  getWishlist,
  toggleWishlist,
} from "../controllers/wishlist.controller.js";
import { authMiddleware } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.get("/", authMiddleware, getWishlist);
router.post("/toggle", authMiddleware, toggleWishlist);

export default router;
