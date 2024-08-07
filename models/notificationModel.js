import {Schema, model} from "mongoose";
import mongoose from "mongoose";

const notificationSchema = new Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: true
    },
    type:{
        type: String,
        enum : ['budgetAlert', 'expenseAlert'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
    
},{
    timestamps: true
});

export const notificationModel = mongoose.model('notificationModel', notificationSchema)