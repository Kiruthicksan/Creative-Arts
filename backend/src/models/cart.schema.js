import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assests",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  priceAtAdd: {
    type: Number,
    required: true,
  },
},{id : false});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [cartItemSchema],
    totalItems: Number,
    totalPrice: Number,
  },
  { timestamps: true },
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
