"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../configs/config"));
const errorHandler = (err, _req, res, _next) => {
    // 1) Map Mongoose errors to your API statuses/messages
    // mongoose validation (minlength,required,enum,custom validators)
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        return res.status(400).json({ message: err.message });
    }
    // mongoose cast error (bad Objectid)
    if (err instanceof mongoose_1.default.Error.CastError) {
        return res.status(400).json({ message: 'Invalid Id Format' });
    }
    // duplicate key
    if (err?.code === 11000) {
        return res.status(409).json({ message: 'User Already Exists' });
    }
    // 2) Default status/message
    const status = err.status ?? 500;
    //In production, hide details for unexpected errors (500)
    const message = config_1.default.nodeEnv === 'production' && status === 500
        ? 'Internal Server Error'
        : err.message;
    // 3) Logging (dev only). Don't return from logging blocks.
    if (config_1.default.nodeEnv === "development") {
        console.error(err);
    }
    // 4) Attach Zod details (only if present)
    const details = err?.details;
    if (config_1.default.nodeEnv !== 'production' && Array.isArray(details)) {
        return res.status(status).json({ message, details });
    }
    return res.status(status).json({ message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map