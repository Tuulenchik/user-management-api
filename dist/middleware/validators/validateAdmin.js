"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdmin = void 0;
const httpErrors_1 = require("../../utils/httpErrors");
const validateAdmin = (req, res, next) => {
    const role = res.locals.authRole;
    if (role !== "admin") {
        return next((0, httpErrors_1.forbidden)('Forbidden'));
    }
    return next();
};
exports.validateAdmin = validateAdmin;
//# sourceMappingURL=validateAdmin.js.map