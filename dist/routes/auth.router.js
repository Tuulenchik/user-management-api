"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = require("../middleware/errorHandler/asyncHandler");
const validateRegister_1 = require("../middleware/validators/validateRegister");
const usersController_1 = require("../controllers/usersController");
const validateLogin_1 = require("../middleware/validators/validateLogin");
const authRouter = express_1.default.Router();
authRouter.post('/register', validateRegister_1.validateRegister, (0, asyncHandler_1.asyncHandler)(usersController_1.registerUser));
authRouter.post('/login', validateLogin_1.validateLogin, (0, asyncHandler_1.asyncHandler)(usersController_1.loginUser));
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map