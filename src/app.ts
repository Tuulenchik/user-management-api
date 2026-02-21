import express from "express";
import {logger} from "./middleware/logger"
import router from "./routes/users.router";
import { errorHandler } from "./middleware/errorHandler/errorHandler";
import { notfound } from "./middleware/errorHandler/notFound";
import authRouter from "./routes/auth.router";
import helmet from "helmet";
import { corsMiddleware } from "./middleware/security/cors";
import { apiRateLimiter, authRateLimiter } from "./middleware/security/rateLimit";
import config from "./configs/config";

const app= express()

app.disable("x-powered-by")
app.use(express.json({limit:"10kb"}))

app.use(logger)
app.use(helmet())
app.use(corsMiddleware)

//generall endpoints
if (config.nodeEnv === "production") app.set("trust proxy", 1);
if (config.nodeEnv !== "test") {
  app.use(apiRateLimiter);
}
app.use('/users',router)
app.use('/auth', authRateLimiter, authRouter)

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});
//error handling middleware
app.use(notfound)
app.use(errorHandler)

export default app