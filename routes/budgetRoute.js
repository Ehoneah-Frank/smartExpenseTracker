import { Router } from "express";
import { createBudget, getBudgets, updateBudget, deleteBudget } from "../controllers/budgetController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const budgetRouter = Router();

budgetRouter.post('/', authMiddleware, createBudget);
budgetRouter.get('/', authMiddleware, getBudgets);
budgetRouter.patch('/:id', authMiddleware, updateBudget);
budgetRouter.delete('/:id', authMiddleware, deleteBudget);

export default budgetRouter;
