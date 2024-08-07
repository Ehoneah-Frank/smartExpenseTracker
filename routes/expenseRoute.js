import { Router } from "express";
import { createExpense, getExpenses, updateExpense, deleteExpense } from "../controllers/expenseController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const expenseRouter = Router();

expenseRouter.post('/', authMiddleware, createExpense);
expenseRouter.get('/', authMiddleware, getExpenses);
expenseRouter.patch('/:id', authMiddleware, updateExpense);
expenseRouter.delete('/:id', authMiddleware, deleteExpense);

export default expenseRouter;