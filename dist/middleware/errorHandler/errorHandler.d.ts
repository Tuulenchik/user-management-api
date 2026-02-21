import { ErrorRequestHandler } from "express";
export interface AppError extends Error {
    status?: number;
}
export declare const errorHandler: ErrorRequestHandler;
//# sourceMappingURL=errorHandler.d.ts.map