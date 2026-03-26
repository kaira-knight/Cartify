import axios from "axios";

export const googleAuth = async (token) => {
  const res = await axios.post(
    "http://localhost:8000/api/google-login",
    { token }
  );
  return res.data;
};
