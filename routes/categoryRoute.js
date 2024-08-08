import { Router } from "express";
import { getCategories,getOneCategory, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const categoryRouter = Router();

categoryRouter.post('/', authMiddleware, createCategory);
categoryRouter.get('/', authMiddleware, getCategories);
categoryRouter.get('/:id', authMiddleware, getOneCategory);
categoryRouter.patch('/:id', authMiddleware, updateCategory);
categoryRouter.delete('/:id', authMiddleware, deleteCategory);

export default categoryRouter;
