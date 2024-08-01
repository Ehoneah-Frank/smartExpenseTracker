import { Router } from "express";
import { signup, login } from "../controllers/authController.js";

// create a router
const authRouter = Router();

// create a signup endpoint
authRouter.post('/signup', signup);

// create a login endpoint
authRouter.post('/login', login);

export default authRouter;