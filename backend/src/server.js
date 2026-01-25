import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import assestsRoutes from "./routes/assests.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/assests", assestsRoutes);
app.use("/api/upload", uploadRoutes);

const server = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

server();
