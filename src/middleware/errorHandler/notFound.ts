import {Request,Response,NextFunction} from "express"
import { notFound } from "../../utils/httpErrors"

export const notfound=(req:Request,res:Response,next:NextFunction)=>{
   return next(notFound('Not Found'))
}

