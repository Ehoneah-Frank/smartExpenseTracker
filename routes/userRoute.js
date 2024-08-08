import { Router } from "express";
import { getProfile, updateProfile, changePassword } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const userRouter = Router();

userRouter.get('/:id', authMiddleware, getProfile);
userRouter.patch('/:id', authMiddleware, updateProfile);
userRouter.patch('/password/:id', authMiddleware, changePassword);

export default userRouter;