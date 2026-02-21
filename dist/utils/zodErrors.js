"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodBadRequest = zodBadRequest;
const httpErrors_1 = require("./httpErrors");
function zodBadRequest(error) {
    const issues = error.issues.map((i) => ({
        path: i.path.join('.'),
        message: i.message,
        code: i.code
    }));
    const message = issues[0]?.message ?? 'Invalid request';
    const err = (0, httpErrors_1.badRequest)(message);
    err.details = issues;
    return err;
}
//# sourceMappingURL=zodErrors.js.map