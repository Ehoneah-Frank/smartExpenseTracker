import { Router } from "express";
import { getMonthlySpendingTrends, getCategoryWiseBreakdown, getRecentExpenses } from "../controllers/analyticsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";




const analyticsRouter = Router();

analyticsRouter.get('/monthly-spending-trends',  authMiddleware, getMonthlySpendingTrends);
analyticsRouter.get('/category-wise-breakdown/', authMiddleware, getCategoryWiseBreakdown);
analyticsRouter.get('/recent-expenses/', authMiddleware, getRecentExpenses);

export default analyticsRouter;