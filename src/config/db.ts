import mongoose from "mongoose";
import config from "config";

const INIT_DB = async () => {
    await mongoose.connect(config.get("database.url"));
};

export default INIT_DB;
