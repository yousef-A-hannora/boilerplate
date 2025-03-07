import { Request, Response, NextFunction } from "express";
import { AppError, InternalError } from "../exceptions/customErrors";

export type asyncMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;

const ErrorHandler = (method: asyncMiddleware) => 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (err: unknown) {
            const exception = err instanceof AppError ? err : InternalError;
            next(exception);
        }
    };

export default ErrorHandler