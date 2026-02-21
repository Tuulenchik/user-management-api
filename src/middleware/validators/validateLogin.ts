import { RequestHandler } from "express"
import { zodBadRequest } from "../../utils/zodErrors"
import { LoginSchema } from "../../schemas/login.schemas"

    
export const validateLogin: RequestHandler=(req,res,next)=>{
    const result = LoginSchema.safeParse(req.body)
    if(!result.success){
        return next(zodBadRequest(result.error))
    }
    res.locals.loginInput=result.data
    return next()
}