"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const validateUserId_1 = require("../middleware/validators/validateUserId");
const asyncHandler_1 = require("../middleware/errorHandler/asyncHandler");
const validateRoleFiltering_1 = require("../middleware/validators/validateRoleFiltering");
const validateUpdateUser_1 = require("../middleware/validators/validateUpdateUser");
const authMiddleware_1 = require("../middleware/validators/authMiddleware");
const validateAdmin_1 = require("../middleware/validators/validateAdmin");
const requireSelfOrAdmin_1 = require("../middleware/validators/requireSelfOrAdmin");
const forbidRoleChangeUnlessAdmin_1 = require("../middleware/validators/forbidRoleChangeUnlessAdmin");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authMiddleware, validateAdmin_1.validateAdmin, validateRoleFiltering_1.validateRoleFiltering, (0, asyncHandler_1.asyncHandler)(usersController_1.getUsersDB));
router.get('/:id', authMiddleware_1.authMiddleware, validateUserId_1.validateUserId, requireSelfOrAdmin_1.requireSelfOrAdmin, (0, asyncHandler_1.asyncHandler)(usersController_1.getUserById));
router.patch('/:id', authMiddleware_1.authMiddleware, validateUserId_1.validateUserId, requireSelfOrAdmin_1.requireSelfOrAdmin, validateUpdateUser_1.validateUpdateUser, forbidRoleChangeUnlessAdmin_1.forbidRoleChangeUnlessAdmin, (0, asyncHandler_1.asyncHandler)(usersController_1.updateUser));
router.delete('/:id', authMiddleware_1.authMiddleware, validateAdmin_1.validateAdmin, validateUserId_1.validateUserId, (0, asyncHandler_1.asyncHandler)(usersController_1.deleteUser));
exports.default = router;
//# sourceMappingURL=users.router.js.map