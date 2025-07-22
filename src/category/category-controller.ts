import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category-service";

export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    async create(req: Request, res: Response, next: NextFunction) {}
}
