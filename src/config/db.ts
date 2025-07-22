import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const INIT_DB = async () => {
    try {
        await mongoose.connect(config.get("database.url"));
    } catch (err) {
        logger.error("Error in MongoDB connection", { err });
    }
};

export default INIT_DB;
