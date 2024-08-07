import mongoose, { Schema, model, Types} from "mongoose";


const categorySchema = new Schema({
    userId:{
        type: Types.ObjectId,
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