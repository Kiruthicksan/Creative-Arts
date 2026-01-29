import mongoose, { Types } from "mongoose";
import { Assests } from "../models/assests.schema.js";
import Cart from "../models/cart.schema.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { assetId, quantity = 1 } = req.body;

    // ---------- VALIDATION ----------
    if (!mongoose.Types.ObjectId.isValid(assetId)) {
      return res.status(400).json({ message: "Invalid asset id" });
    }

    if (quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    }

    // ---------- FIND ASSET ----------
    const asset = await Assests.findById(assetId).lean();
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    // ---------- GET OR CREATE CART ----------
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    // ---------- CHECK EXISTING ITEM ----------
    const itemIndex = cart.items.findIndex(
      (item) => item.asset.toString() === assetId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        asset: assetId,
        quantity,
        priceAtAdd: asset.price,
      });
    }

    // ---------- RECALCULATE TOTALS ----------
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.priceAtAdd,
      0,
    );

    await cart.save();

    await cart.populate({
      path: "items.asset",
      select: "title previewImages price discount author",
    });

    return res.status(200).json({
      message: "Asset added to cart",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // ---------- FIND CART ----------
    let cart = await Cart.findOne({ user: userId })
      .populate({
        path: "items.asset",
        select: "title previewImages price discount author",
      })
      .lean();

    // ---------- IF NO CART, RETURN EMPTY ----------
    if (!cart) {
      return res.status(200).json({
        cart: {
          items: [],
          totalItems: 0,
          totalPrice: 0,
        },
      });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { assetId } = req.body;

    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { asset: assetId } } },
      { new: true },
    ).populate({
      path: "items.asset",
      select: "title previewImages price discount author",
    });

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    updatedCart.totalItems = updatedCart.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    updatedCart.totalPrice = updatedCart.items.reduce((sum, item) => {
      const price = item.asset?.price || 0;
      return sum + item.quantity * price;
    }, 0);

    await updatedCart.save();

    return res.status(200).json({
      message: "Item removed from cart",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Remove cart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { assetId, quantity } = req.body;

    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { "items.$[item].quantity": quantity } },
      {
        new: true,
        arrayFilters: [{ "item.asset": new Types.ObjectId(assetId) }],
      },
    ).populate({
      path: "items.asset",
      select: "title previewImages price discount author",
    });

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    updatedCart.totalItems = updatedCart.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    updatedCart.totalPrice = updatedCart.items.reduce((sum, item) => {
      const price = item.asset?.price || 0;
      return sum + item.quantity * price;
    }, 0);

    await updatedCart.save();

    return res.status(200).json({
      message: "Quantity updated in cart",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Update quantity error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
