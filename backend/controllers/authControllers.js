import validator from "validator";
import User from "../models/userModel.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
    try {
        const {fullName, username, email, password} = req.body;

        //checks if the email is valid
        if(!validator.isEmail(email)){
            return res.status(400).json({success: false, error: "Invalid email format"});
        }

        //this checks if your username already exists 
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({success: false, error: "Username is already taken"})
        }
        
        //this checks if your email already exists 
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({success: false, error: "Email is already taken"})
        }

        if(password.length < 6) {
            return res.status(400).json({success: false, error: "Password must be at lest 6 characters long "})
        }
        
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName: fullName,
            username: username,
            email: email,
            password: hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,

            })
        }
        else{
            res.status(400).json({success: false, error: "Invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup controller", error.message)

        res.status(500).json({success: false, error: "Interna Server Error"})
    }
}

const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect){
            return res.status(400).json({success: false, error: "Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,
            followers: newUser.followers,
            following: newUser.following,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg,

        })

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.statu(500).json({error: "Internal Server Error"})
    }
}

const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller", err.message);
        res.status.json({error: " Internal Server Error"});
    }
}

export {signup, login, logout, getMe}