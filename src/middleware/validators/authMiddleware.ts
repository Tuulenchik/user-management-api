import { RequestHandler } from "express"
import { unauthorized } from "../../utils/httpErrors"
import * as jwt from "jsonwebtoken"
import config from "../../configs/config";
    
type JwtPayload={
    sub:string,
    role:"admin" | "user",
    iat?: number,
    exp?: number
}

export const authMiddleware: RequestHandler=(req,res,next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader){
        return next(unauthorized('Missing Authorization header'))
    }

    const [scheme,token]=authHeader.split(" ")
    if(scheme !== "Bearer" || !token){
        return next(unauthorized('Invalid Authorization format'))
    }

    try{
        const payload=jwt.verify(token, config.jwtSecret) as JwtPayload

        //attach to request pipeline
        res.locals.authUserId = payload.sub
        res.locals.authRole = payload.role
        
        return next()

    }catch{
        return next(unauthorized('Invalid or expired token'))
    }
}