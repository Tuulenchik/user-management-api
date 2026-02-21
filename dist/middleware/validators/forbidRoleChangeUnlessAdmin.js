"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbidRoleChangeUnlessAdmin = void 0;
const httpErrors_1 = require("../../utils/httpErrors");
const forbidRoleChangeUnlessAdmin = (req, res, next) => {
    const authRole = res.locals.authRole;
    if (!res.locals.updateUserInput) {
        return next((0, httpErrors_1.badRequest)('no User Input'));
    }
    if (authRole !== "admin" && res.locals.updateUserInput.role) {
        return next((0, httpErrors_1.forbidden)('Only admin can change role'));
    }
    return next();
};
exports.forbidRoleChangeUnlessAdmin = forbidRoleChangeUnlessAdmin;
//# sourceMappingURL=forbidRoleChangeUnlessAdmin.js.map