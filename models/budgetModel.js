import mongoose, { Schema, model, } from "mongoose";
const budgetSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    timePeriod: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        required: true,
    },
    startDate: {
        type: Date,
        required: function () {
            return this.timePeriod === 'daily';
        },
    },
    endDate: {
        type: Date,
        required: function () {
            return this.timePeriod === 'daily';
        },
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categoryModel",
            required: true,
        },
    ],
    currentSpending: {
        type: Number,
        default: 0,
    },


},{
    timestamps: true,
});

export const budgetModel = mongoose.model('budgetModel', budgetSchema)

// export default budgetModel;
