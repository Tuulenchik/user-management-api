import mongoose from "mongoose";
import { Role, Roles } from "../schemas/user.schemas";

const {Schema, model} = mongoose

export interface IUser {
    name: string,
    role: Role,
    email: string,
    passwordHash: string
}

export const toUserDTO = (u:any)=>({
    id: String(u._id),
    name:u.name,
    email:u.email,
    role:u.role,
    createdAt:u.createdAt,
    updatedAt:u.updatedAt
})

export const userSchema=new Schema<IUser> ({
    name:{
        type:String,
        trim:true,
        minlength:2,
        required:true,
    },
    role:{
        type:String,
        enum:[...Roles],
        default:'user'
    },
    email:{
        type:String,
        lowercase:true,
        trim:true,
        required:true,
        unique:true
    },
    passwordHash:{
        type:String,
        required:true,
        select:false
    }
},{
    timestamps:true
})


export const User = model<IUser>('User', userSchema)



