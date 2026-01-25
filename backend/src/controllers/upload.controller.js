import crypto from "crypto";
import cloudinary from "../config/cloudinary";
import secret from "../utils/secret";
export const uploadFile = async (req, res) => {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = `creators/${req.user.id}/assets`;
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      secret.cloudinary.api_secret,
    );

    res.json({
      timestamp,
      folder,
      signature,
      cloud_name: secret.cloudinary.cloud_name,
      api_key: secret.cloudinary.api_key,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
