import { Router } from "express";
import { getProfile, updateProfile, changePassword } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authmiddleware.js";


const userRouter = Router();

userRouter.get('/profile', authMiddleware, getProfile);
userRouter.patch('/profile', authMiddleware, updateProfile);
userRouter.patch('/password', authMiddleware, changePassword);

export default userRouter;