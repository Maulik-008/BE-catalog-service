import app from "./app";
import INIT_DB from "./config/db";
import logger from "./config/logger";
import config from "config";

const startServer = async () => {
    const PORT: number = config.get("server.port") || 5502;
    try {
        await INIT_DB();
        logger.info("Database connected Successfully");
        app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message);
            logger.on("finish", () => {
                process.exit(1);
            });
        }
    }
};

void startServer();
