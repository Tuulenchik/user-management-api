"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserId = void 0;
const httpErrors_1 = require("../../utils/httpErrors");
const zodErrors_1 = require("../../utils/zodErrors");
const mongoose_1 = __importDefault(require("mongoose"));
const user_schemas_1 = require("../../schemas/user.schemas");
const validateUserId = (req, res, next) => {
    const result = user_schemas_1.UsersParamsSchema.safeParse(req.params);
    if (!result.success) {
        return next((0, zodErrors_1.zodBadRequest)(result.error));
    }
    const { id } = result.data;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return next((0, httpErrors_1.badRequest)(`Invalid User Id`));
    }
    res.locals.userId = id;
    return next();
};
exports.validateUserId = validateUserId;
//# sourceMappingURL=validateUserId.js.map