import mongoose from "mongoose";
import {Request, Response, NextFunction, ErrorRequestHandler} from "express"
import config from "../../configs/config"

export interface AppError extends Error {
  status?: number;
}

export const errorHandler:ErrorRequestHandler=(
    err:any,
    _req:Request,
    res:Response,
    _next:NextFunction
    )=>{ 
        // 1) Map Mongoose errors to your API statuses/messages

        // mongoose validation (minlength,required,enum,custom validators)
        if(err instanceof mongoose.Error.ValidationError){
            return res.status(400).json({message:err.message})
        }
        // mongoose cast error (bad Objectid)
        if(err instanceof mongoose.Error.CastError){
            return res.status(400).json({message: 'Invalid Id Format'})
        }
        // duplicate key
        if(err?.code===11000){
            return res.status(409).json({message: 'User Already Exists'})
        }

        // 2) Default status/message
        const status=(err as AppError).status ?? 500
        
        //In production, hide details for unexpected errors (500)
        const message = config.nodeEnv === 'production' && status ===500
        ? 'Internal Server Error'
        : err.message

         // 3) Logging (dev only). Don't return from logging blocks.
        if (config.nodeEnv === "development") {
            console.error(err);
        }
        // 4) Attach Zod details (only if present)
        const details=err?.details
        if(config.nodeEnv !== 'production' && Array.isArray(details)){
            return res.status(status).json({message, details})
        }
        

        return res.status(status).json({message})
    }   