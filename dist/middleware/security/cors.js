"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("../../configs/config"));
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (origin === config_1.default.clientOrigin)
            return callback(null, true);
        const err = new Error("Not allowed by CORS");
        err.status = 403;
        return callback(err);
    },
    credentials: false,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};
exports.corsMiddleware = (0, cors_1.default)(corsOptions);
//# sourceMappingURL=cors.js.map