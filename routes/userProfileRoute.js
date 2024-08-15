import { Router } from "express";
import { createUserProfile,getProfile, updateProfile, changePassword } from "../controllers/userProfileController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";



const userRouter = Router();


userRouter.post("/profile", 
    upload.fields([
        { name: 'profilePicture', maxCount: 1 },
        { name: 'profilePicture', maxCount: 1 },
    ]),
authMiddleware,
createUserProfile
);

userRouter.get('/:id', authMiddleware, getProfile);

userRouter.patch('/profile',
    upload.fields([
        {name: 'profilePicture', maxCount: 1},
        {name: 'profilePicture', maxCount: 1},
    ]),
     authMiddleware, updateProfile);


userRouter.patch('/password/:id', authMiddleware, changePassword);

export default userRouter;