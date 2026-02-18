import User from "../models/userSchema.js";
import { Assets } from "../models/assets.schema.js";

/**
 * @desc Get user's wishlist
 * @route GET /api/wishlist
 * @access Private
 */
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Toggle (Add/Remove) item in wishlist
 * @route POST /api/wishlist/toggle
 * @access Private
 */
export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if asset exists
    const asset = await Assets.findById(productId);
    if (!asset) {
      return res.json({ message: "Product not found" });
    }

    const index = user.wishlist.indexOf(productId);

    if (index === -1) {
      // Add to wishlist
      user.wishlist.push(productId);
      await user.save();
      const userPopulated = await user.populate("wishlist");
      return res.status(200).json({
        message: "Added to wishlist",
        wishlist: userPopulated.wishlist,
        added: true,
      });
    } else {
      // Remove from wishlist
      user.wishlist.splice(index, 1);
      await user.save();
      const userPopulated = await user.populate("wishlist");
      return res.status(200).json({
        message: "Removed from wishlist",
        wishlist: userPopulated.wishlist,
        added: false,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
