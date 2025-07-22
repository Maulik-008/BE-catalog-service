import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import { CategoryService } from "./category-service";
import { CategoryController } from "./category-controller";

const CategoryRouter = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);

CategoryRouter.post("/", (async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    await categoryController.create(req, res, next);
}) as RequestHandler);

export default CategoryRouter;
