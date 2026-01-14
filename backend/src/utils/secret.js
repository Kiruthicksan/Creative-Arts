import dotenv from "dotenv"

dotenv.config();


const config = {
    db: {
        URI: process.env.MONGO_URI,
    },
}   ;

export default config;