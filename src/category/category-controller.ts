import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category-service";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { Category } from "./category-types";

export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const validatedResult = validationResult(req);

            if (!validatedResult.isEmpty()) {
                return next(
                    createHttpError(
                        400,
                        validatedResult.array()[0].msg as string,
                    ),
                );
            }
            const { attributes, name, priceConfiguration } =
                req.body as Category;
            const created = await this.categoryService.create({
                attributes,
                name,
                priceConfiguration,
            });

            res.status(201).json({
                id: created ? created._id : null,
                message: "user created success",
            });
        } catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(createHttpError(501, "internal Server Error"));
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        if (!id) {
            return next(createHttpError(400, "Please Provide Update Id"));
        }
        try {
            const validatedBody = validationResult(req);
            if (!validatedBody.isEmpty()) {
                return next(createHttpError(400));
            }
            const updatedData = req.body as Category;

            await this.categoryService.update(id, updatedData);

            res.status(200).json({ message: "Category Updated Successfully" });
        } catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(createHttpError(501, "internal Server Error"));
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const paramsId = req.params?.id ?? null;

            await this.categoryService.delete(paramsId);
            res.status(200).json({ message: "Category Deleted Successfully" });
        } catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(createHttpError(501, "internal Server Error"));
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const getAllData = await this.categoryService.findAllCategory();

            res.status(200).json({ data: getAllData });
        } catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(createHttpError(501, "internal Server Error"));
        }
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const idData = req.params.id;
            const getDataById =
                await this.categoryService.findByCategoryId(idData);

            res.status(200).json({ data: getDataById });
        } catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(createHttpError(501, "internal Server Error"));
        }
    }
}
