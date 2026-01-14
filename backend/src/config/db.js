import mongoose from "mongoose";

import config from "../utils/secret.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.db.URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;
