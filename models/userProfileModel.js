import { Schema, model, Types } from 'mongoose';
import mongoose from "mongoose";


const userProfileSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'userModel',  // Reference to the userModel
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: '',
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    profilePicture: {
        type: String,  
        required: false,
    },
});

export const userProfileModel = mongoose.model('userProfile', userProfileSchema);

// export default userProfileModel;
