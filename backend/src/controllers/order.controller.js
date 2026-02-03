import rzp from "../config/razorpay.js";
import Order from "../models/order.model.js";
import Cart from "../models/cart.schema.js";
import config from "../utils/secret.js";
import crypto from "crypto";
import { Assets } from "../models/assets.schema.js";

// Create Razorpay Order
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.asset");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total amount from server-side data to ensure security
    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const asset = item.asset;
      if (!asset) continue;

      const itemTotal = asset.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        asset: asset._id,
        price: asset.price, // Storing unit price
        quantity: item.quantity,
      });
    }

    // Create Razorpay Order
    const options = {
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}_${userId.slice(-6)}`,
    };

    const razorpayOrder = await rzp.orders.create(options);

    if (!razorpayOrder) {
      return res
        .status(500)
        .json({ message: "Failed to create Razorpay order" });
    }

    // Create Local Order
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalAmount: totalAmount,
      razorpayOrderId: razorpayOrder.id,
      status: "pending",
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      key: config.razorpay.key_id,
      order: razorpayOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", config.razorpay.key_secret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment successful

      // 1. Update Order Status
      const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
      if (order) {
        order.status = "paid";
        order.razorpayPaymentId = razorpay_payment_id;
        order.razorpaySignature = razorpay_signature;
        await order.save();

        // 2. Clear User's Cart
        await Cart.findOneAndDelete({ user: order.user });
      }

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get Purchased Items (Library)
export const getPurchasedItems = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all paid orders for this user
    const orders = await Order.find({ user: userId, status: "paid" })
      .populate("items.asset")
      .sort({ createdAt: -1 });

    const libraryItemsMap = new Map();

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.asset) {
          const assetId = item.asset._id.toString();

          if (!libraryItemsMap.has(assetId)) {
            libraryItemsMap.set(assetId, {
              ...item.asset.toObject(),
              purchaseDate: order.updatedAt,
              orderId: order._id,
            });
          }
        }
      });
    });

    const libraryItems = Array.from(libraryItemsMap.values());

    res.status(200).json({ success: true, items: libraryItems });
  } catch (error) {
    console.error("Error fetching library:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
