import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import * as SecureStore from "expo-secure-store";

const getUserFromSecureStore = SecureStore.getItemAsync("User")
  ? SecureStore.getItemAsync("User")
  : null;

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
    console.log("Call here");
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

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
      state.isSuccess = true;
      state.user = action.payload;
      state.message = "Login successful";
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.user = null;
      state.message = action.payload || "Login failed";
    });
  },
});

export default authSlice.reducer;
