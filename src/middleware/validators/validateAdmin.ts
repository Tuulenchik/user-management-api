import { RequestHandler } from "express"
import { forbidden } from "../../utils/httpErrors"

export const validateAdmin: RequestHandler=(req,res,next)=>{
    const role=res.locals.authRole
        if(role !== "admin"){
        return next (forbidden('Forbidden'))
        }
    
    return next()
}