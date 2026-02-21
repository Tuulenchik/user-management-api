"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersDB = getUsersDB;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const httpErrors_1 = require("../utils/httpErrors");
const users_model_mongo_1 = require("../models/users.model.mongo");
const users_service_1 = require("../services/users.service");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../configs/config"));
//get all users
async function getUsersDB(req, res) {
    const role = res.locals.role;
    if (role) {
        const userRole = await (0, users_service_1.listUsersByRole)(role);
        return res.status(200).json(userRole.map(users_model_mongo_1.toUserDTO));
    }
    const users = await (0, users_service_1.listUsers)();
    return res.status(200).json(users.map(users_model_mongo_1.toUserDTO));
}
//get one user
async function getUserById(req, res) {
    const userId = res.locals.userId;
    if (!userId)
        throw (0, httpErrors_1.badRequest)("Missing userId");
    const oneUser = await (0, users_service_1.getUserbyID)(userId);
    if (!oneUser) {
        throw (0, httpErrors_1.notFound)('User not found');
    }
    return res.status(200).json((0, users_model_mongo_1.toUserDTO)(oneUser));
}
//patch one user
async function updateUser(req, res) {
    const userId = res.locals.userId;
    if (!userId)
        throw (0, httpErrors_1.badRequest)("Missing userId");
    const updatedUser = await (0, users_service_1.updatingUser)(userId, res.locals.updateUserInput);
    if (updatedUser === null) {
        throw (0, httpErrors_1.notFound)('User not Found');
    }
    return res.status(200).json((0, users_model_mongo_1.toUserDTO)(updatedUser));
}
//delete one user
async function deleteUser(req, res) {
    const userId = res.locals.userId;
    const authUserId = res.locals.authUserId;
    if (!userId)
        throw (0, httpErrors_1.badRequest)("Missing userId");
    if (userId === authUserId)
        throw (0, httpErrors_1.forbidden)("Cannot delete this user");
    const userIndex = await (0, users_service_1.deletingUser)(userId);
    if (userIndex === null) {
        throw (0, httpErrors_1.notFound)('User not found');
    }
    return res.sendStatus(204);
}
//register User
async function registerUser(req, res) {
    const userBody = res.locals.registerInput;
    if (!userBody) {
        throw (0, httpErrors_1.badRequest)('Missing user to register');
    }
    const existingEmail = await users_model_mongo_1.User.findOne({ email: userBody.email });
    if (existingEmail) {
        throw (0, httpErrors_1.conflict)("Email already in use");
    }
    const passwordHash = await bcrypt.hash(userBody.password, 10);
    const created = await users_model_mongo_1.User.create({
        name: userBody.name,
        email: userBody.email,
        passwordHash,
    });
    return res.status(201).json((0, users_model_mongo_1.toUserDTO)(created));
}
//login user
async function loginUser(req, res) {
    const userBody = res.locals.loginInput;
    if (!userBody) {
        throw (0, httpErrors_1.unauthorized)("Invalid email or password");
    }
    const user = await users_model_mongo_1.User.findOne({ email: userBody.email }).select("+passwordHash");
    if (!user) {
        throw (0, httpErrors_1.unauthorized)("Invalid email or password");
    }
    const password = await bcrypt.compare(userBody.password, user.passwordHash);
    if (!password) {
        throw (0, httpErrors_1.unauthorized)("Invalid email or password");
    }
    const token = jwt.sign({ sub: String(user._id), role: user.role }, config_1.default.jwtSecret, { expiresIn: "15m" });
    return res.status(200).json({
        token,
        user: (0, users_model_mongo_1.toUserDTO)(user)
    });
}
//# sourceMappingURL=usersController.js.map