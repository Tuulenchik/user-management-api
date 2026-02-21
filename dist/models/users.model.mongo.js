"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = exports.toUserDTO = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_schemas_1 = require("../schemas/user.schemas");
const { Schema, model } = mongoose_1.default;
const toUserDTO = (u) => ({
    id: String(u._id),
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt
});
exports.toUserDTO = toUserDTO;
exports.userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        minlength: 2,
        required: true,
    },
    role: {
        type: String,
        enum: [...user_schemas_1.Roles],
        default: 'user'
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
        select: false
    }
}, {
    timestamps: true
});
exports.User = model('User', exports.userSchema);
//# sourceMappingURL=users.model.mongo.js.map