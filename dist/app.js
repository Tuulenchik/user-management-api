"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./middleware/logger");
const users_router_1 = __importDefault(require("./routes/users.router"));
const errorHandler_1 = require("./middleware/errorHandler/errorHandler");
const notFound_1 = require("./middleware/errorHandler/notFound");
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = require("./middleware/security/cors");
const rateLimit_1 = require("./middleware/security/rateLimit");
const config_1 = __importDefault(require("./configs/config"));
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use(express_1.default.json({ limit: "10kb" }));
app.use(logger_1.logger);
app.use((0, helmet_1.default)());
app.use(cors_1.corsMiddleware);
//generall endpoints
if (config_1.default.nodeEnv === "production")
    app.set("trust proxy", 1);
if (config_1.default.nodeEnv !== "test") {
    app.use(rateLimit_1.apiRateLimiter);
}
app.use('/users', users_router_1.default);
app.use('/auth', rateLimit_1.authRateLimiter, auth_router_1.default);
//error handling middleware
app.use(notFound_1.notfound);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map