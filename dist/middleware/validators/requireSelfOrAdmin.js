"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSelfOrAdmin = void 0;
const httpErrors_1 = require("../../utils/httpErrors");
const requireSelfOrAdmin = (req, res, next) => {
    const authRole = res.locals.authRole;
    const authId = res.locals.authUserId;
    const targetId = res.locals.userId;
    if (authRole === "admin") {
        return next();
    }
    if (authId === targetId) {
        return next();
    }
    return next((0, httpErrors_1.forbidden)('Forbidden'));
};
exports.requireSelfOrAdmin = requireSelfOrAdmin;
//# sourceMappingURL=requireSelfOrAdmin.js.map