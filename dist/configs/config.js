"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
//Load .env file contents into process.env by default
dotenv_1.default.config();
const rawPort = process.env.PORT;
const mongoUri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;
const clientOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:3000";
let port = 3000; // default if missing
//if rawport is not undefined and is not empty than 'parsed' will equal Number(rawPort)
//but if 'parsed' is not a number then we will throw an error
// if everything is fine then port's value will be replaced by parsed value
if (rawPort !== undefined && rawPort.trim() !== '') {
    const parsed = Number(rawPort);
    if (Number.isNaN(parsed)) {
        throw new Error(`Invalid PORT: "${rawPort}"`);
    }
    port = parsed;
}
if (!mongoUri) {
    throw new Error("Missing MONGO_URI in environment");
}
if (!jwtSecret) {
    throw new Error("Missing JWT_SECRET in environment");
}
//we make new config after everything is checked:
const config = {
    port,
    nodeEnv: process.env.NODE_ENV ?? 'development',
    mongoUri,
    jwtSecret,
    clientOrigin
};
exports.default = config;
//# sourceMappingURL=config.js.map