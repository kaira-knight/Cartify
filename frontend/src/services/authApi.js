// src/services/authApi.js

import axios from "axios";

export const googleAuth = async (accessToken) => {
  const googleRes = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

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