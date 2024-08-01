import mongoose, { Schema, model, } from "mongoose";


const categorySchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    name: {
        type: String,
        required: true,
    },

},{
    timestamps: true,
});

export const categoryModel = mongoose.model('categoryModel', categorySchema)

// export default categoryModel;