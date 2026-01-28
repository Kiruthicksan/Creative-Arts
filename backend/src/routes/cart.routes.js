import express from "express";
import {
  addToCart,
  getCart,
  removeCart,
  updateQuantity,
} from "../controllers/cart.controller.js";
import { authMiddleware } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/add-to-cart", authMiddleware, addToCart);
router.get("/get-cart", authMiddleware, getCart);
router.delete("/remove-cart", authMiddleware, removeCart);
router.put("/update-quantity", authMiddleware, updateQuantity);

export default router;
