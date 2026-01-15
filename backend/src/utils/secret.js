import dotenv from "dotenv";

dotenv.config();

const config = {
  db: {
    URI: process.env.MONGO_URI,
    name: process.env.DB_NAME,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

export default config;
