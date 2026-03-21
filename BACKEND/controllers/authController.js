import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";



//Register ->> Sign Up
export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validation
    if (!name || (!email && !phone) || !password) {
      return res.json({
        success: false,
        message: "Name, Email or Phone, and Password are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    // Generate Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Registered Successfully" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


//LOGIN with Email Or Phone SignIn
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.json({
        success: false,
        message: "Email/Phone and Password required",
      });
    }

    // Find by Email OR Phone
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Login Successful" });

  } catch (error) {
    return res.json({ success: false, message: `Login Error ${error.message}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out" });

  } catch (error) {
    return res.json({ success: false, message: `Logut Error ${error.message}` });
  }
};



export const forgotPassword=async(req,res)=>{
    try {
        const {email}=req.body;

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





