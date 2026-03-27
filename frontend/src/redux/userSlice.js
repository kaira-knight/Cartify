import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/auth",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    localStorage.removeItem("user");
    return null;
  }
};

const getTokenFromStorage = () => {
  return localStorage.getItem("token") || null;
};

// ✅ Helper: Detect if input is email or phone
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isPhone = (value) => /^[0-9]{10,15}$/.test(value);

// ========== REGISTER ==========
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { name, emailOrPhone, password, role } = userData;

      // ✅ Detect and send correct field
      const payload = {
        name,
        password,
        role: role || "Customer",
      };

      if (isEmail(emailOrPhone)) {
        payload.email = emailOrPhone;
      } else if (isPhone(emailOrPhone)) {
        payload.phone = emailOrPhone;
      } else {
        return rejectWithValue("Please enter a valid email or phone number");
      }

      const { data } = await API.post("/register", payload);

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// ========== LOGIN ==========
export const login = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/login", {
        identifier: userData.emailOrPhone,
        password: userData.password,
      });

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      // ✅ Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// ========== GOOGLE LOGIN ==========
export const googleLogin = createAsyncThunk(
  "user/googleLogin",
  async (accessToken, { rejectWithValue }) => {
    try {
      const googleRes = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      const { data } = await API.post("/google-login", {
        name: googleRes.data.name,
        email: googleRes.data.email,
        googleId: googleRes.data.sub,
      });

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      // ✅ Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Google login failed"
      );
    }
  }
);

// ========== LOGOUT ==========
export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  try {
    await API.post("/logout");
  } catch (error) {
    // Ignore
  }

  return { message: "Logged out" };
});

// ========== SLICE ==========
const userSlice = createSlice({
  name: "user",

  initialState: {
    user: getUserFromStorage(),
    token: getTokenFromStorage(),
    isAuthenticated: !!getTokenFromStorage(),
    loading: false,
    error: null,
    message: null,
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GOOGLE LOGIN
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = action.payload.message;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.message = "Logged out successfully";
      });
  },
});

export const { clearError, clearMessage } = userSlice.actions;
export default userSlice.reducer;