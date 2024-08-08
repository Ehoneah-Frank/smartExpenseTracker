import mongoose from "mongoose";
import { expenseModel } from "../models/expenseModel.js";

export const getMonthlySpendingTrends = async (req, res) => {
  try {
    const userId = req.user.id;
    // userId = req.params;

    const result = await expenseModel.aggregate([
      { $match: { user: userId } },
      {
        $project: {
          month: { $month: "$date" },
          year: { $year: "$date" },
          amount: 1,
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          year: "$_id.year",
          total: 1,
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to get monthly spending trends" });
  }
};

export const getCategoryWiseBreakdown = async (req, res) => {
  try {
    const userId = req.user._id;
    // userId = req.params;

    const result = await expenseModel.aggregate([
      { $match: { user: userId } },

      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $project: {
          _id: 0,
          categoryName: "$category.name",
          totalAmount: 1,
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to get category wise breakdown" });
  }
};

export const getRecentExpenses = async (req, res) => {
  try {
    const userId = req.user._id;
    // userId = req.params;

    const result = await expenseModel
      .find({ user: userId })
      .sort({ date: -1 })
      .limit(10)
      .populate("category", "name")
      .exec();

    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to get recent expenses" });
  }
};
