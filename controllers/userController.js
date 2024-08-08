import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
   
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to get profile" });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  const { username, email } = req.body;

  try {
    await userModel.findByIdAndUpdate(req.user.userId, { username, email });
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
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

























































// import { userModel } from "../models/userModel.js";

// import bcrypt from "bcrypt";

// // endpoint to a getProfile
// export const getProfile = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.user._id).select("-password");
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to get profile" });
//   }
// };

// // endpoint to updateProfile
// export const updateProfile = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     await userModel.findByIdAndUpdate(req.user._id, {
//       username,
//       email,
//     });
//     res.json({ message: "Profile updated successfully" });

//   } catch (error) {
//     res.status(500).json({ message: "Failed to update profile"});
//   }
// };

// // endpoint to change password
// export const changePassword = async (req, res) => {
//     const {oldPassword, newPassword} = req.body;
//     try {
//         const user = await userModel.findById(req.user._id);
//         const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({
//                 message: "Invalid old password"
//             });
//         }
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;
//         await user.save();
//         res.json({ message: "Password changed successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to change password" });
//     }
// };


// // 