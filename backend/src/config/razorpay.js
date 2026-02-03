import Razorpay from "razorpay";
import config from "../utils/secret.js";

const rzp = new Razorpay({
  key_id: config.razorpay.key_id,
  key_secret: config.razorpay.key_secret,
});

export default rzp;
