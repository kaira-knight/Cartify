import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";



//Register ->> Sign Up
export const registerUser=async(req,res)=> {
    try {
        const {name,email,phone,password}=req.body;

        if(!email && !phone){
            return res.status(400).json({
                message:"Email Or Phone Required"
            });
        }

        const userExists=await User.findOne({
            $or: [{ email }, { phone }],
        });

        if(userExists){
            return res.status(400).json({ 
                message:"User Already Exists"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            name,
            email,
            phone,
            password:hashedPassword,
        });

        res.status(201).json({
            message: "Registered Successfully",
            token:generateToken(user._id),
        });


    }
    catch(error){
        res.status(500).json({ message:error.message});

    }
};

//LOGIN with Email Or Phone SignIn
export const loginUser=async(req,res)=>{
    try{
        const { identifier,password }=req.body;
        const user=await User.findOne({
            $or:[{ email: identifier}, {phone: identifier }],

        });

        if(!user){
            return res.status(400).json({message: "User Not Found"});
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({ message:"Invalid Credentials"});
        }

        res.json({
            message:"Login Successful",
            token:generateToken(user._id),
        });



    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

export const forgotPassword=async(req,res)=>{
    try {
        const {email}=eq.body;

        const user=await User.findOne( {email });

        if(!user){
            return res.status(400).json( {
                message:"Users Not Found"
            });
        }
        const resetToken=crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

        user.resetPasswordExpire=Date.now()+15*60*1000;

        await user.save();

        const resetURL= `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await sendEmail({
            email:user.email,
            subject:"Password Reset",
            message:`Click here to reset password: ${resetURL}`,
        });

        res.json({
            message:"Reset Link to set to email"
        });



    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
};

//Reset-Password
export const resetPassword=async(req,res)=>{
    try {
        const resetToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user=await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpire:{$gt: Date.now()},
        });

        if(!user){
            return res.status(400).json({
                message:"Invalid or expired Token"
            });
        }
        user.password=await bcrypt.hash(req.body.password,10);
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save();

        res.json({message:"Password Reset Successful"});
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
} ;





