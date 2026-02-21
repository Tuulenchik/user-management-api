import { Request, Response } from "express";
import { badRequest, conflict, forbidden, notFound, unauthorized } from "../utils/httpErrors";
import { toUserDTO, User } from "../models/users.model.mongo";
import { deletingUser, listUsers, getUserbyID, listUsersByRole, updatingUser,} from "../services/users.service";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import config from "../configs/config";

//get all users
export async function getUsersDB (req:Request, res:Response){
    const role = res.locals.role
    if(role){
       const userRole= await listUsersByRole(role)
       return res.status(200).json(userRole.map(toUserDTO))
    }
    const users=await listUsers()
    return res.status(200).json(users.map(toUserDTO))
}

//get one user
export async function getUserById(req:Request, res:Response){
    const userId= res.locals.userId
    if (!userId) throw badRequest("Missing userId");
    const oneUser= await getUserbyID(userId)
    if(!oneUser){
        throw notFound('User not found')
    }
    return res.status(200).json(toUserDTO(oneUser))
}

//patch one user
export async function updateUser(req:Request,res:Response) {
    const userId= res.locals.userId
    if (!userId) throw badRequest("Missing userId");
    const updatedUser= await updatingUser(userId, res.locals.updateUserInput!)
    if(updatedUser===null){
        throw notFound('User not Found')
    }
    return res.status(200).json(toUserDTO(updatedUser))
}

//delete one user
export async function deleteUser(req:Request, res:Response){
    const userId = res.locals.userId
    const authUserId = res.locals.authUserId
    if (!userId) throw badRequest("Missing userId");
    if(userId === authUserId) throw forbidden ("Cannot delete this user")
    const userIndex= await deletingUser(userId)
    if (userIndex===null) {
        throw notFound ('User not found')
    }
    return res.sendStatus(204);
}

//register User

export async function registerUser(req:Request, res:Response) {
    const userBody=res.locals.registerInput
    if(!userBody){
        throw badRequest('Missing user to register')
    }

    const existingEmail = await User.findOne({ email: userBody.email });
    if (existingEmail) {
    throw conflict("Email already in use");
    }

    const passwordHash=await bcrypt.hash(userBody.password,10)

    const created = await User.create({
    name: userBody.name,
    email: userBody.email,
    passwordHash,
    });

    return res.status(201).json(toUserDTO(created));

}

//login user

export async function loginUser(req:Request,res:Response){
    const userBody=res.locals.loginInput
    if(!userBody){
        throw unauthorized("Invalid email or password")
    }

    const user = await User.findOne({ email: userBody.email }).select("+passwordHash")
    if (!user) {
        throw unauthorized("Invalid email or password")
    }

    const password = await bcrypt.compare(userBody.password, user.passwordHash)
    if(!password){
        throw unauthorized("Invalid email or password")
    }

    const token = jwt.sign(
        { sub: String(user._id), role: user.role},
        config.jwtSecret,
        { expiresIn: "15m"}
    )

    return res.status(200).json({
        token,
        user: toUserDTO(user)
    })
}