import express from "express";
import { asyncHandler } from "../middleware/errorHandler/asyncHandler";
import { validateRegister } from "../middleware/validators/validateRegister";
import { loginUser, registerUser } from "../controllers/usersController";
import { validateLogin } from "../middleware/validators/validateLogin";

const authRouter = express.Router()

authRouter.post('/register', validateRegister, asyncHandler(registerUser))
authRouter.post('/login', validateLogin, asyncHandler(loginUser))

export default authRouter