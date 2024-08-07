import { Router } from "express";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const categoryRouter = Router();

categoryRouter.post('/', authMiddleware, createCategory);
categoryRouter.get('/', authMiddleware, getCategories);
categoryRouter.patch('/:id', authMiddleware, updateCategory);
categoryRouter.delete('/:id', authMiddleware, deleteCategory);

export default categoryRouter;
