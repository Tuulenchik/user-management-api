import { RequestHandler } from "express"
import { forbidden } from "../../utils/httpErrors"

export const requireSelfOrAdmin: RequestHandler=(req,res,next)=>{
    const authRole=res.locals.authRole
    const authId=res.locals.authUserId
    const targetId=res.locals.userId
        if(authRole === "admin"){
            return next ()
        }
        if(authId === targetId){
            return next ()
        }
    
    return next(forbidden('Forbidden'))
}