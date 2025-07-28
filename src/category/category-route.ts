import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import { CategoryService } from "./category-service";
import { CategoryController } from "./category-controller";
import categoryValidator from "./category-validator";
import authentication from "../common/middlewares/authentication";
import { routeProtection } from "../common/middlewares/routeProtection";
import { ROLES } from "../constants";

const CategoryRouter = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);

CategoryRouter.post(
    "/",
    authentication,
    routeProtection([ROLES.ADMIN, ROLES.MANAGER]),
    categoryValidator,
    (async (req: Request, res: Response, next: NextFunction) => {
        await categoryController.create(req, res, next);
    }) as RequestHandler,
);

CategoryRouter.put(
    "/:id",
    authentication,
    routeProtection([ROLES.ADMIN, ROLES.MANAGER]),
    categoryValidator,
    (async (req: Request, res: Response, next: NextFunction) => {
        await categoryController.update(req, res, next);
    }) as RequestHandler,
);

CategoryRouter.delete(
    "/:id",
    authentication,
    routeProtection([ROLES.ADMIN, ROLES.MANAGER]),
    (async (req: Request, res: Response, next: NextFunction) => {
        await categoryController.delete(req, res, next);
    }) as RequestHandler,
);

CategoryRouter.get("/", authentication, (async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    await categoryController.getAll(req, res, next);
}) as RequestHandler);

CategoryRouter.get("/:id", authentication, (async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    await categoryController.getById(req, res, next);
}) as RequestHandler);

export default CategoryRouter;
