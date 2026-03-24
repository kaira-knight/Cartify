import axios from "axios";

const API_KEY = process.env.FAST2SMS_API_KEY;

export const sendSms = async (phone, otp) => {
  try {
    // Ensure phone has country code (91)
    const phoneWithCode = phone.startsWith("91") ? phone : `91${phone}`;
    
    const message = `Your OTP is ${otp}. Valid for 10 minutes.`;

    const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: API_KEY,
        message: message,
        language: "english",
        route: "v",
        numbers: phoneWithCode
      }
    });

    // Check if SMS sent successfully
    if (response.data.return === true) {
      return {
        success: true,
        message: "SMS sent successfully"
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to send SMS"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message
    };
  }
};