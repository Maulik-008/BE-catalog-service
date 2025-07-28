import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types";
import createHttpError from "http-errors";

export const routeProtection = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const _req = req as AuthRequest;

        const roleFromToken = _req.auth.role;

        if (roles.length > 0 && !roles.includes(roleFromToken)) {
            const error = createHttpError(
                403,
                "You don't have enough permissions to access this route",
            );
            next(error);
            return;
        }

        next();
    };
};
