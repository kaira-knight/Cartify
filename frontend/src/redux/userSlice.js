import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/auth",
  withCredentials: true,
});

// ========== REGISTER ==========
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/register", userData);
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
      const { data } = await API.post("/login", userData);
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
      // Step 1: Get user info from Google
      const googleRes = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      // Step 2: Send to your backend
      const { data } = await API.post("/google-login", {
        name: googleRes.data.name,
        email: googleRes.data.email,
        googleId: googleRes.data.sub,
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Google login failed"
      );
    }
  }
);

// ========== LOGOUT ==========
export const logout = createAsyncThunk(
  "user/logout",
  async () => {
    const { data } = await API.post("/logout");
    return data;
  }
);

// ========== SLICE ==========
const userSlice = createSlice({
  name: "user",

  initialState: {
    user: null,
    isAuthenticated: false,
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

      // ===== REGISTER =====
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

      // ===== LOGIN =====
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== GOOGLE LOGIN =====
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== LOGOUT =====
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.message = "Logged out";
      });
  },
});

export const { clearError, clearMessage } = userSlice.actions;
export default userSlice.reducer;