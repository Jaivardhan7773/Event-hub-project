import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
if(!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            isApproved: role === 'organiser' ? false : true, // organisers need approval
            message: "User registered successfully",
        });

        const token = generateToken(user._id, user.role);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // send secure cookies in production
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isApproved: user.isApproved,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id, user.role);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // send secure cookies in production
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isApproved: user.isApproved,
            message: 'Login successful',
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const logoutUser = (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        console.log("Error in logout route: ", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const checkUserAuth = (req , res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in /check router in authentication file ");
        res.status(500).json({
            message: "Internal server error"
        });
    }
}