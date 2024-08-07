import { expenseModel } from "../models/expenseModel.js";
import { categoryModel } from "../models/categoryModel.js";
import { budgetModel } from "../models/budgetModel.js";
import { notificationModel } from "../models/notificationModel.js";


// Endpoint to add expense
export const createExpense = async (req, res) => {
  const { amount, description, date, category } = req.body;

  try {
    const formattedDate = new Date(date);

    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "User is not authenticated" });
    }

    // Validate category ID
    const existingCategory = await categoryModel.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if the category belongs to the user
    if (existingCategory.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to add expense to this category" });
    }

    // Find all expenses in the same category and time period
    const budget = await budgetModel.findOne({
      userId: req.user._id,
      categories: category,
      startDate: { $lte: formattedDate },
      endDate: { $gte: formattedDate },
    });

    if (!budget) {
      return res
        .status(404)
        .json({ message: "No budget found for this category" });
    }

    // calculate the total spending
    const totalSpending = await expenseModel.aggregate([
      { $match: { category: category, user: req.user._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const currentTotal = totalSpending[0] ? totalSpending[0].total : 0;
    console.log(currentTotal);

    const newTotal = currentTotal + amount;

    // Checking if the new total spending exceeds the budget
    if (newTotal > budget.amount) {
      // send budget alert notification
      await notificationModel.create({
        userId:req.user._id,
        type: 'expenseAlert',
        message: `Expense exceeds the budget limit. Budget left: ${
          budget.amount - currentTotal
        }`

      })

      return res.status(400).json({
        message: `Expense exceeds the budget limit. Budget left: ${
          budget.amount - currentTotal
        }`,
      });
    }

    // Create a new expense
    const expense = new expenseModel({
      user: req.user._id,
      amount,
      category,
      description,
      date: formattedDate,
    });

    await expense.save();

    res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to create expense" });
  }
};

// Endpoint to show all expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.find({ user: req.user._id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to get expenses" });
  }
};

// Endpoint to update an expense
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, description, date, category } = req.body;

  try {
    // Find the existing expense
    const existingExpense = await expenseModel.findById(id);
    if (!existingExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Calculate the difference in amount
    const amountDifference = amount - existingExpense.amount;

    // Find the budget associated with the category
    const budget = await budgetModel.findOne({
      userId: req.user._id,
      categories: category || existingExpense.category,
      startDate: { $lte: new Date(date) },
      endDate: { $gte: new Date(date) },
    });

    if (!budget) {
      return res
        .status(404)
        .json({ message: "No budget found for this category" });
    }

    // Calculate the current total spending
    const totalSpending = await expenseModel.aggregate([
      {
        $match: {
          category: category || existingExpense.category,
          user: req.user._id,
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const currentTotal = totalSpending[0] ? totalSpending[0].total : 0;
    const newTotal = currentTotal + amountDifference;

    // Check if the new spending exceeds the budget amoount
    if (newTotal > budget.amount) {

      // Send budget alert notification
      await notificationModel.create({
        userId: req.user._id,
        type: 'expenseAlert',
        message: `Updated expense exceeds the budget limit. Budget left: ${
          budget.amount - currentTotal
        }`,
      });


      return res.status(400).json({
        message: `Updated expense exceeds the budget limit. Budget left: ${
          budget.amount - currentTotal
        }`,
      });
    }
    
    // Update the expense
    existingExpense.amount = amount;
    existingExpense.description = description;
    existingExpense.date = date;
    existingExpense.category = category || existingExpense.category;

    await existingExpense.save();

    res.json({
      message: "Expense updated successfully",
      expense: existingExpense,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update expense", error: error.message });
  }
};

// Endpoint to delete an Expense
export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await expenseModel.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }
    res.json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete expense" });
  }
};
