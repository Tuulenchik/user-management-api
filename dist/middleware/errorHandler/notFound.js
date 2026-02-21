"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notfound = void 0;
const httpErrors_1 = require("../../utils/httpErrors");
const notfound = (req, res, next) => {
    return next((0, httpErrors_1.notFound)('Not Found'));
};
exports.notfound = notfound;
//# sourceMappingURL=notFound.js.map