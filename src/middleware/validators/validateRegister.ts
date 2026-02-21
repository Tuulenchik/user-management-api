import { RequestHandler } from "express"
import { zodBadRequest } from "../../utils/zodErrors"
import { RegisterSchema } from "../../schemas/auth.schemas"

    
export const validateRegister: RequestHandler=(req,res,next)=>{
    const result = RegisterSchema.safeParse(req.body)
    if(!result.success){
        return next(zodBadRequest(result.error))
    }
    res.locals.registerInput=result.data
    return next()
}