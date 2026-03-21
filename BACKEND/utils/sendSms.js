import twilio from "twilio"

const client=twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export const sendSms=async(to,otp)=>{
    try{
        const message=await client.messages.create({
            body:`Your OTP is ${otp}`,
            from:process.env.TWILIO_PHONE,
            to: `+91${to}`,
        });

        return {
            success: true,
            sid:message.sid,
            message:"SMS sent successfully"
        };
    }
    catch(error){
        return {
             success: false,
             message: error.message,
        };
    }
}