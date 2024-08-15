import { userModel } from "../models/userModel.js";
import { userProfileModel } from "../models/userProfileModel.js";
import { userProfileSchema } from "../schema/userProfileSchema.js";
import bcrypt from "bcrypt";


// Create user Profile

export const createUserProfile = async (req, res) => {
  const {firstName, lastName, bio, dateOfBirth, location, profilePicture} = req.body;

  const {error} = userProfileSchema.validate(req.body);
  if(error) {
    return res.status(400).json({message: error.details[0].message});
  }

  try {
    const existingProfile = await userProfileModel.findOne({ userId: req.user._id});
    if(existingProfile) {
      return res.status(400).json({message: "Profile already exists"});
    }

    const newProfile = new userProfileModel({
      userId: req.user._id,
      firstName,
      lastName,
      bio,
      dateOfBirth,
      location,
      profilePicture
    });
    await newProfile.save();
    res.status(201).json({message: "Profile created successfully"});

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "Failed to create profile"});
  }
};


// Get user profile
export const getProfile = async (req, res) => {
  try {
    const userProfile = await userProfileModel.findOne({ userId: req.user._id }).populate('userId', '-password');
    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
      
    res.json(userProfile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to get profile" });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  const { firstName, lastName, bio, dateOfBirth, location, profilePicture } = req.body;

  const {error} = userProfileSchema.validate(req.body);
  if(error){
    return res.status(400).json({message: error.details[0].message});
  }

  try {

    const updatedProfile = await userProfileModel.findOneAndUpdate(
      {userId: req.user._id},
      {firstName, lastName, bio, dateOfBirth, location, profilePicture},
      {new: true}
    );

    if(!updatedProfile) {
      return res.status(404).json({message: "Profile not found"});
    }

    return res.json({message: "Profile updated successfully", updatedProfile});

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to update profile" });
  }
};


// Change password
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await userModel.findByIdAndUpdate(req.user._id);
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to change password" });
  }
};
