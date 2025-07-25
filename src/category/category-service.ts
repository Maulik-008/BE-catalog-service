import CategoryModel from "./category-model";
import { Category } from "./category-types";

export class CategoryService {
    async create(categoryBody: Category) {
        const newCategory = new CategoryModel(categoryBody);
        return await newCategory.save();
    }
    async update(id: string, CategoryBody: Category) {
        return await CategoryModel.findByIdAndUpdate(id, CategoryBody, {
            new: true,
        });
    }
    async delete(id: string) {
        return await CategoryModel.findByIdAndDelete(id);
    }
    async findByCategoryId(id: string) {
        return await CategoryModel.findById(id);
    }
    async findAllCategory() {
        return await CategoryModel.find();
    }
}
