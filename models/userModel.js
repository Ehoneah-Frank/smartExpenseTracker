import { Schema, model } from "mongoose";
import mongoose from "mongoose";    




const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        uinque: true,
    },
    email: {
        type: String,
        required: true,
        uinque: true,
    },
    password: {
        type: String,
        required: true,
    }
    
});

export const userModel = mongoose.model('userModel', userSchema)

// export default userModel;