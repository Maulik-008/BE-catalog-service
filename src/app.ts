import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import CategoryRouter from "./category/category-route";

const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    }),
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use("/categories", CategoryRouter);

app.use(globalErrorHandler);

export default app;
