import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Assets",
      },
    ],
  },
  { timestamps: true },
);

const User = model("User", userSchema);

export default User;
