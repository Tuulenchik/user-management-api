import { Request, Response } from "express";
export declare function getUsersDB(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getUserById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function registerUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function loginUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=usersController.d.ts.map