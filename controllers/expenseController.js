import { expenseModel } from "../models/expenseModel.js";

// Endpoint to add expense
export const createExpense = async (req, res) =>{
    const {amount, description, date} = req.body;

    try {
        const formattedDate = new Date (date);

        // check if user is set in the request
        if (!req.user || !req.user._id){
            // console.log(error);
            return res.status(400).json({ 
                message: "User is not authenticated"
            });
        }

        const expense = new expenseModel({
            user: req.user._id,
            amount,
            category,
            description,
            date: formattedDate,
        });

        await expense.save();
        res.status(201).json({message: "Expense created successfully"});

    } catch (error) {
        res.status(500).json({message: "Failed to create expense"});
    }
};


// Endpoint to show all expenses
export const getExpenses = async (req, res) =>{
    try {
        const expenses = await expenseModel.find({user: req.user._id});
        res.json(expenses);
    } catch (error) {
        res.status(500).json({message: "Failed to get expenses"});
    }
};

// Endpoint to update an expense
export const updateExpense = async (req, res) =>{
    const {id} = req.params;
    const {amount, description, date} = req.body;

    try {
        
        const expense = await expenseModel.findByIdUpdate(id, {
            amount,
            description,
            date,
        }, {new: true});
        if (!expense) {
            return res.status(404).json({message: "Expense not found"});
        }
        res.json({
            message: "Expense updated successfully",
            expense,
        });

    } catch (error) {
        res.status(500).json({message: "Failed to update expense"});
    }

};


// Endpoint to delete an Expense
export const deleteExpense = async (req, res) =>{
    const {id} = req.params;
try {
    const expense = await expenseModel.findByIdAndDelete(id);
    if (!expense) {
        return res.status(404).json({
            message: "Expense not found"
        });
    }
    res.json({
        message: "Expense deleted successfully"
        });
} catch (error) {
    res.status(500).json({message: "Failed to delete expense"});

}
};