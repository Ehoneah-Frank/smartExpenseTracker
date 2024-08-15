import { Router } from "express";
import { signup, login, forgottenPassword, resetPassword } from "../controllers/authController.js";

// create a router
const authRouter = Router();

// create a signup endpoint
authRouter.post('/signup', signup);

// create a login endpoint
authRouter.post('/login', login);

// Create a Forgotten  Password
authRouter.post('/forgotten-password', forgottenPassword);

// Create a Reset Password
authRouter.post('/reset-password', resetPassword)

export default authRouter;