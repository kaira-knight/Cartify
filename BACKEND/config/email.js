import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
   host: "smtp.gmail.com", // Often good to be explicit
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error("Nodemailer Transporter Connection Error:", error.message);
    // You might want to exit the process or handle this more gracefully in production
  } else {
    console.log("Nodemailer Transporter is ready to send emails!");
  }
});

export default transporter;