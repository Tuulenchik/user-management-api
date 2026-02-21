"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
const zodErrors_1 = require("../../utils/zodErrors");
const login_schemas_1 = require("../../schemas/login.schemas");
const validateLogin = (req, res, next) => {
    const result = login_schemas_1.LoginSchema.safeParse(req.body);
    if (!result.success) {
        return next((0, zodErrors_1.zodBadRequest)(result.error));
    }
    res.locals.loginInput = result.data;
    return next();
};
exports.validateLogin = validateLogin;
//# sourceMappingURL=validateLogin.js.map