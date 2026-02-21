"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
exports.badRequest = badRequest;
exports.conflict = conflict;
exports.unauthorized = unauthorized;
exports.forbidden = forbidden;
function notFound(message = 'not Found') {
    const err = new Error(message);
    err.status = 404;
    return err;
}
function badRequest(message = 'Bad Request') {
    const err = new Error(message);
    err.status = 400;
    return err;
}
function conflict(message = 'Conflict') {
    const err = new Error(message);
    err.status = 409;
    return err;
}
function unauthorized(message = 'Unauthorized') {
    const err = new Error(message);
    err.status = 401;
    return err;
}
function forbidden(message = 'Forbidden') {
    const err = new Error(message);
    err.status = 403;
    return err;
}
//# sourceMappingURL=httpErrors.js.map