import { createSlice, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import authService from "./authService";

const initialState = {
  user: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  createdUser: null,
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error.message || "Network Error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPassword(data);
    }catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verify-otp",
  async (data, thunkAPI) => {
    try {
      return await authService.verifyOTP(data);
    }catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data, thunkAPI) => {
    try {
      return await authService.resetPassword(data);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message = error.message || "Network Error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const registerUser = createAsyncThunk(
  "auth/register-user",
  async (user, thunkAPI) => {
    try {
      return await authService.registerUser(user);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    })
    .addCase(verifyOTP.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(verifyOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.createdUser = action.payload;
    })
    .addCase(verifyOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    })
    .addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.otp = action.payload;
    })
    .addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    })
    .addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    })
    .addCase(logout.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = null;
    })
    .addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    })
    .addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.otp = action.payload;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    })
  },
});

export default authSlice.reducer;
