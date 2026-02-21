import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 20,                  // 20 requests per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});

export const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 min
  max: 200,                 // 200 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, slow down." },
});