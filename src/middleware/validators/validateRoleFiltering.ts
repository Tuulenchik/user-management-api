import { RequestHandler } from "express"
import { zodBadRequest } from "../../utils/zodErrors";
import { badRequest } from "../../utils/httpErrors";
import { UsersQuerySchema } from "../../schemas/user.schemas";
    
export const validateRoleFiltering:RequestHandler=(req,res,next)=>{
    
    if (Array.isArray(req.query.role)) {
    return next(badRequest("Role must be a single value"));
  }

    const result = UsersQuerySchema.safeParse(req.query)
    if(!result.success){
        return next(zodBadRequest(result.error))
    }
    
    const {role}=result.data
    if(role !== undefined){
       res.locals.role = role
    }
    
    return next()
}