import { body } from "express-validator";

export default [
    body("name").exists().withMessage("Name is required").isString(),
    body("priceConfiguration")
        .exists()
        .withMessage("priceConfiguration is required"),
    body("priceConfiguration.*.priceType")
        .exists()
        .withMessage("priceType is required")
        .custom((value: "base" | "additional") => {
            const validKeys = ["base", "additional"];
            if (!validKeys.includes(value)) {
                throw new Error(
                    `${value} is invalid attribute for priceType field. Possible values are: [${validKeys.join(
                        ", ", // base, addtional
                    )}]`,
                );
            }
            return true;
        }),
    body("attributes").exists().withMessage("attributes is required"),
];
