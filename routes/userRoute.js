import { Router } from "express";
import { getProfile, updateProfile, changePassword } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const userRouter = Router();

userRouter.get('/:id', authMiddleware, getProfile);
userRouter.patch('/profile', authMiddleware, updateProfile);
userRouter.patch('/password', authMiddleware, changePassword);

export default userRouter;