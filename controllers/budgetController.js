import { budgetModel } from "../models/budgetModel.js";
import { expenseModel } from "../models/expenseModel.js";
import { categoryModel } from "../models/categoryModel.js";
import { userProfileModel } from "../models/userProfileModel.js";

// Endpoint to create a new budget
export const createBudget = async (req, res) => {
  try {
    const { amount, timePeriod, startDate, endDate, categories } = req.body;

    const user = await userProfileModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // calculate the total budget set by the user
    const existingBudgets = await budgetModel.find({ userId: req.user._id });
    const totalBudgetedAmount = existingBudgets.reduce(
      (sum, budget) => sum + budget.amount,
      0
    );

    if (totalBudgetedAmount + amount > user.totalAmount) {
      return res
        .status(400)
        .json({
          message: "You have exceeded your total budget",
          availableAmount: user.totalAmount - totalBudgetedAmount,
        });
    }

    // create and save the new budget
    const budget = new budgetModel({
      userId: req.user.id,
      amount,
      timePeriod,
      startDate,
      endDate,
      categories,
    });
    await budget.save();

    // update user's total expenses and balance
    user.totalExpenses += amount;
    user.balance = user.totalAmount - user.totalExpenses;
    await user.save();

    res.status(201).json({ message: "Budget created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to create budget" });
  }
};

// Endpoint to get budgets for a user
export const getBudgets = async (req, res) => {
  try {
    const budgets = await budgetModel.find({ userId: req.user.id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Failed to get budgets" });
  }
};

// Endpoint to update a budget
export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, timePeriod, startDate, endDate, categories } = req.body;

    const budget = await budgetModel.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { amount, timePeriod, startDate, endDate, categories },
      { new: true }
    );

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Calculate the current spending for the given categories
    const expenses = await expenseModel.find({
      user: req.user.id,
      category: { $in: categories },
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    const currentSpending = expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    const overBudget = currentSpending > amount;

    budget.currentSpending = currentSpending;
    await budget.save();

    res.json({
      message: "Budget updated successfully",
      budget,
      overBudget,
      warning: overBudget
        ? "You have exceeded your budget for this category."
        : "You are within your budget.",
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Failed to update budget", error: error.message });
  }
};

// Endpoint to delete a budget
export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await budgetModel.findByIdAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    const user = await userProfileModel.findById(req.user._id);
    user.totalExpenses -= budget.amount;
    user.balance = user.totalAmount - user.totalExpenses;
    await user.save();

    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete budget" });
  }
};
