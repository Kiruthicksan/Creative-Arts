import express from "express";
import {
  createOrder,
  verifyPayment,
  getPurchasedItems,
  getAllOrders,
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyPayment);
router.get("/library", authMiddleware, getPurchasedItems);
router.get("/all", authMiddleware, getAllOrders);

export default router;
