"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUser = void 0;
const zodErrors_1 = require("../../utils/zodErrors");
const user_schemas_1 = require("../../schemas/user.schemas");
const validateUpdateUser = (req, res, next) => {
    const result = user_schemas_1.UpdateUserSchema.safeParse(req.body);
    if (!result.success) {
        return next((0, zodErrors_1.zodBadRequest)(result.error));
    }
    res.locals.updateUserInput = result.data;
    return next();
};
exports.validateUpdateUser = validateUpdateUser;
//# sourceMappingURL=validateUpdateUser.js.map