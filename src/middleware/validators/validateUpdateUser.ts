import { RequestHandler } from "express"
import { zodBadRequest } from "../../utils/zodErrors"
import { UpdateUserSchema } from "../../schemas/user.schemas"

export const validateUpdateUser:RequestHandler =(req,res,next)=>{
    const result = UpdateUserSchema.safeParse(req.body)
    if(!result.success){
        return next(zodBadRequest(result.error))
    }
    res.locals.updateUserInput=result.data
    return next()
}