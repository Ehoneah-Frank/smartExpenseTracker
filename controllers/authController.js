import { userModel } from "../models/userModel.js";
import { userSchema} from "../schema/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Signup endpoint
export const signup = async (req, res) => {
  // const {username, email, password} = req.body;

  const {error, value} = userSchema.validate(req.body)
  if(error) {
    return res.status(400).json({message: error.details[0].message});
  }

  const email = value.email
  const findIfUserExist = await userModel.findOne({email})
  if (findIfUserExist) {
    return res.status(400).json({message: "User already exist"});
  } else{
    const hashedPassword = await bcrypt.hash(value.password, 12)

    value.password = hashedPassword

    const addUser = await userModel.create(value)
    req.session.user = {userId: addUser._id}}
    res.status(201).json({message: "User created successfully"})
  }




  // const { username, email, password } = req.body;
  // try {
  //   const user = new userModel({
  //     username,
  //     email,
  //     password,
  //   });

  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   user.password = hashedPassword;

  //   await user.save();
  //   res.status(201).json({ message: "User created successfully" });
  // } catch (error) {
  //   res.status(500).json({ message: "Failed to create user" });
  // }


// Login endpoint

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }); // Search by email only
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const correctPassword = await bcrypt.compare(password, user.password); 
    if (!correctPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    // req.session.user = { userId: user._id }; 
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '3h' });
    return res.status(200).json({ message: "Login successful", accessToken: token,
      user: {
      // username: user.username,
      email: user.email
      }
    });

    // res.json({ message: "Login successful" }); 

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to login" });
  }
};

  
export const token = async (req, res) => {
  try {
    const {email, username, password} = req.body;

    const user = await userModel.findOne({
      $or: [{email}, {username}]
    });
    if (!user){
      return res.status(404).json({message: "User not found"});
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword){
      return res.status(401).json({message: "Invalid credentials"});
    }
          
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '3h' });
      return res.status(200).json({ message: "Login successful", accessToken: token,
        user: {
        username: user.username,
        email: user.email
        }
      });
  } catch (error) {
    console.log(error.message)
    next(error);
  }
}

// Logout endpoint
export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    res.clearCookie('connect.sid'); // Assuming you're using default session cookie name
    res.json({ message: "Logout successful" });
  });
};
























































// import { userModel } from "../models/userModel.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// // create a signup endpoint
// export const signup = async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const user = new userModel({
//       username,
//       email,
//       password,
//     });
//     // hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     user.password = hashedPassword;

//     await user.save();
//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Fialed to create user" });
//   }
// };

// // create a function for the login
// // export const login = async (req, res) => {
// //   try {
// //     const { email, username, password } = req.body;

// //     const user = await userModel.findOne({
// //       $or: [{ email }, { username }],
// //     });
// //     if (!user) {
// //         console.log(error.message)
// //       return res.status(404).json({
// //         message: "User not found",
// //       });
// //     }

// //     const correctPassword = await bcrypt.compare(password, user.password);
// //     if (!correctPassword) {
// //       return res.status(401).json({
// //         message: "Invalid credentials",
// //       });
// //     }
// //     req.session.user = { userId: user.id };
// //     return res.json({ message: "Login successful" });
// //   } catch (error) {
// //     console.log(error.message);
// //     res.status(500).json({ message: "Failed to login" });
// //   }
// // };

// // create a login endpoint
// export const login = async (req, res) =>{
//     const {email, username ,password} = req.body;

// try {

//     const user = await userModel.findOne({
//         $or: [
//             {email},
//             {username}
//         ]
//     });
//     if(!user){
//         console.log("User not found with email:", email);
//         return res.status(404).json({
//             message:"User not found"
//         })
//     }
//     console.log('User found:', user);
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         console.log('Invalid password for user:', email);
//         return res.status(401).json({
//             message: "Invalid password"
//         });
//     }
//     const token = jwt.sign({ userId: user._id}, process.env.JWT_PRIVATE_KEY, {expiresIn: '1h'});
//     res.json({token});
// } catch (error) {
//     console.log(error.message)
//     res.status(500).json({ message: "Failed to login"});
// }
// };
