import { RequestHandler } from "express"
import { badRequest, forbidden } from "../../utils/httpErrors"

export const forbidRoleChangeUnlessAdmin: RequestHandler=(req,res,next)=>{
    const authRole=res.locals.authRole
    
    if(!res.locals.updateUserInput){
        return next(badRequest('no User Input'))
    }
    
    if(authRole !== "admin" && res.locals.updateUserInput.role ){
         return next (forbidden('Only admin can change role'))
    }
    
    
    return next()
}