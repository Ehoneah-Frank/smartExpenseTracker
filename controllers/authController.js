import {userModel} from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



// create a signup endpoint
export const signup = async (req, res) =>{
    const {username, email, password} = req.body;
    try {
        const user = new userModel({
            username,
            email,
            password
        });
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        await user.save();
        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        res.status(500).json({message: "Fialed to create user"});
    }
};

// create a login endpoint
export const login = async (req, res) =>{
    const {email, username ,password} = req.body;

try {

    const user = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    });
    if(!user){
        console.log("User not found with email:", email);
        return res.status(404).json({
            message:"User not found"
        })
    }
    console.log('User found:', user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        console.log('Invalid password for user:', email);
        return res.status(401).json({
            message: "Invalid password"
        });
    }
    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({token});
} catch (error) {
    res.status(500).json({ message: "Failed to login"});
}
};