import express from "express";
import { getUsersDB, getUserById, updateUser, deleteUser } from "../controllers/usersController";
import { validateUserId } from "../middleware/validators/validateUserId"
import { asyncHandler } from "../middleware/errorHandler/asyncHandler";
import { validateRoleFiltering } from "../middleware/validators/validateRoleFiltering";
import { validateUpdateUser } from "../middleware/validators/validateUpdateUser";
import { authMiddleware } from "../middleware/validators/authMiddleware";
import { validateAdmin } from "../middleware/validators/validateAdmin";
import { requireSelfOrAdmin } from "../middleware/validators/requireSelfOrAdmin";
import { forbidRoleChangeUnlessAdmin } from "../middleware/validators/forbidRoleChangeUnlessAdmin";
const router = express.Router()


router.get('/', authMiddleware, validateAdmin, validateRoleFiltering, asyncHandler(getUsersDB))
router.get('/:id', authMiddleware, validateUserId, requireSelfOrAdmin, asyncHandler(getUserById))
router.patch('/:id', authMiddleware, validateUserId, requireSelfOrAdmin, validateUpdateUser, forbidRoleChangeUnlessAdmin, asyncHandler(updateUser))
router.delete('/:id', authMiddleware, validateAdmin, validateUserId, asyncHandler(deleteUser))

export default router