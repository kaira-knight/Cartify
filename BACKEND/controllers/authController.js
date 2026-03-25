import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../config/email.js"
import { sendSms } from "../utils/sendSms.js";



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
      // Provide specific feedback on WHICH field is taken
      if (existingUser.email === email) {
        return res.status(409).json({ message: "Email already registered" });
      }
      if (existingUser.phone === phone) {
        return res.status(409).json({ message: "Phone already registered" });
      }
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role
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

//FORGOT AND RESET PASWWORD REQUIRE   3 steps
//1.SEND OTP
//2.VERIFY OTP
//3.RESET PASSWORD


export const sendOtp = async (req, res) => {
  try {
    const { identifier } = req.body;

    if (!identifier) {
      return res.status(400).json({
        success: false,
        message: "Email or Phone Required",
      });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    let result;

    // 📧 EMAIL FLOW
    if (user.email === identifier) {
      await sendEmail(user.email, otp);
      result = {
        success: true,
        message: "OTP sent to email",
      };
    }
    // 📱 PHONE FLOW — but only if SMS is available
    else if (user.phone === identifier) {
      // ⚠️ Check if SMS can actually be sent
      if (!process.env.SMS_API_KEY || process.env.SMS_API_KEY.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "SMS service unavailable. Please try with your email.",
        });
      }

      try {
        const smsRes = await sendSms(user.phone, otp);

        if (!smsRes.success) {
          throw new Error(smsRes.message || "SMS sending failed");
        }

        result = {
          success: true,
          message: "OTP sent to phone",
        };
      } catch (smsError) {
        // Any SMS failure → graceful fallback
        return res.status(400).json({
          success: false,
          message: "Unable to send SMS. Please try with your email.",
        });
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Send OTP Error:", error); // 👈 Always log server errors
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};


//Step2-> //Verify OTP

export const verifyOtp=async(req,res)=>{
  try{
    const {identifier,otp}=req.body

    //Validation
    if(!identifier || !otp){
      return res.status(400).json({
        success:false,
        message:"Email/Phone and OTP required",
      });
    }

    //Find User
    const user=await User.findOne({
      $or:[{email:identifier},{phone:identifier}],
    });

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //No otp stored 
     if (!user.otp) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request again",
      });
    }

    //Check expiry

     if (user.otpExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    //Otp Match Check

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.isOtpVerified=true;

    await user.save();

     return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  }
  catch(error){
    return res.status(500).json({
      success: false,
      message: error.message,
    });


  }
}

//Step3->> Reset Password
export const resetPassword=async(req,res)=>{
  try{
    const {identifier,newPassword}=req.body;

     if (!identifier || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone and new password required",
      });
    }

     const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

     if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isOtpVerified || user.otpExpire<Date.now()) {
      return res.status(403).json({
        success: false,
        message: "OTP verification required",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.otp = null;
    user.otpExpire = null;
    user.isOtpVerified = false;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  }

  catch(error){
    return res.status(500).json({
      success: false,
      message: `Reset Password Error${error.message}`,
    });

  }
}











