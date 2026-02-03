import User from "../models/userSchema.js";

export const getUserStats = async (req, res) => {
  try {
    const [total] = await Promise.all([
      User.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};