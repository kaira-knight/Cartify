import transporter from "../config/email.js";
import nodemailer from "nodemailer"

const sendEmail= async(options)=> {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to:options.email,
        subject:options.subject,
        text: options.message,
    });

};

export default sendEmail;