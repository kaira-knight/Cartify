import transporter from "../config/email.js";

const sendEmail= async(options)=> {
    await transporter.sendMail({
        to:options.email,
        subject:options.subject,
        text: options.message,
    });

};

export default sendEmail;