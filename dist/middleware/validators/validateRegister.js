"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const zodErrors_1 = require("../../utils/zodErrors");
const auth_schemas_1 = require("../../schemas/auth.schemas");
const validateRegister = (req, res, next) => {
    const result = auth_schemas_1.RegisterSchema.safeParse(req.body);
    if (!result.success) {
        return next((0, zodErrors_1.zodBadRequest)(result.error));
    }
    res.locals.registerInput = result.data;
    return next();
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateRegister.js.map