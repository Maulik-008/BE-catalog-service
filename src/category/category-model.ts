import mongoose from "mongoose";
import { Attribute, Category, PriceConfiguration } from "./category-types";

const attributeSchema = new mongoose.Schema<Attribute>({
    name: { type: String, required: true },
    widgetType: { type: String, enum: ["switch", "radio"], required: true },
    defaultValue: { type: mongoose.Schema.Types.Mixed, required: true },
    availableOptions: [String],
});

const optionSchema = new mongoose.Schema<PriceConfiguration>({
    priceType: { Type: String, enum: ["base", "aditional"], required: true },
    availableOptions: [String],
});

const CetegorySchema = new mongoose.Schema<Category>({
    name: {
        type: String,
        required: true,
    },
    priceConfiguration: {
        type: Map,
        of: optionSchema,
        required: true,
    },
    attributes: {
        type: [attributeSchema],
        required: true,
    },
});

export default mongoose.model("Category", CetegorySchema);
