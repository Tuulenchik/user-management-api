import { RequestHandler } from "express"
import { badRequest } from "../../utils/httpErrors"
import { zodBadRequest } from "../../utils/zodErrors"
import mongoose from "mongoose"
import { UsersParamsSchema } from "../../schemas/user.schemas"

export const validateUserId: RequestHandler<{id:string}> =(req,res,next)=>{
    const result = UsersParamsSchema.safeParse(req.params)
    if (!result.success) {
        return next(zodBadRequest(result.error))
    }
    const {id}=result.data
    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(badRequest(`Invalid User Id`))
    }
    res.locals.userId=id
    return next()
}