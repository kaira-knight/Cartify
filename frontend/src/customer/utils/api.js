import axios from "axios";

export const googleAuth = async (accessToken) => {
  // Step 1: Get user info from Google using access_token
  const googleRes = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  // Step 2: Send user info to your backend
  const res = await axios.post(
    "http://localhost:8000/api/auth/google-login",

    {
      name: googleRes.data.name,
      email: googleRes.data.email,
      picture: googleRes.data.picture,
      googleId: googleRes.data.sub,
    }
  );

  return res.data;

};