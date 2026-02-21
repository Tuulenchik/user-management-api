"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRoleFiltering = void 0;
const zodErrors_1 = require("../../utils/zodErrors");
const httpErrors_1 = require("../../utils/httpErrors");
const user_schemas_1 = require("../../schemas/user.schemas");
const validateRoleFiltering = (req, res, next) => {
    if (Array.isArray(req.query.role)) {
        return next((0, httpErrors_1.badRequest)("Role must be a single value"));
    }
    const result = user_schemas_1.UsersQuerySchema.safeParse(req.query);
    if (!result.success) {
        return next((0, zodErrors_1.zodBadRequest)(result.error));
    }
    const { role } = result.data;
    if (role !== undefined) {
        res.locals.role = role;
    }
    return next();
};
exports.validateRoleFiltering = validateRoleFiltering;
//# sourceMappingURL=validateRoleFiltering.js.map