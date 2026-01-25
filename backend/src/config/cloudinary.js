import { v2 as cloudinary } from "cloudinary";
import secret from "../utils/secret.js";

cloudinary.config({
  cloud_name: secret.cloudinary.cloud_name,
  api_key: secret.cloudinary.api_key,
  api_secret: secret.cloudinary.api_secret,
});

export default cloudinary;
