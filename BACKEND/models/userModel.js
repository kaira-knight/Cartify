import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            sparse: true,
        },

         phone: {
            type: String,
            unique: true,
            sparse: true
         },
         password:{
            type: String,
            required: true
         },

         otp: String,

         otpExpire: Date,

         isOtpVerified: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: ["Customer", "Seller", "Admin"], 
            default: "Customer" // default role
        }
    },
    {timestamps: true}
);

const User=mongoose.model("User",userSchema);
export default User;