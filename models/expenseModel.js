import { Schema, model } from "mongoose";
import mongoose from "mongoose";    


const expenseSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },

}, {
    timestamps: true,
});

export const expenseModel = mongoose.model('expenseModel', expenseSchema)

// export default expenseModel;