import { Request, Response, NextFunction } from "express";
type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<any>;
export declare const asyncHandler: (fn: AsyncController) => (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=asyncHandler.d.ts.map