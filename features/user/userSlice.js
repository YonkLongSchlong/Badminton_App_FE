import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import userService from "./userService";

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
export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await userService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "OTP sent to email successfully";
        state.otp = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Failed to send OTP";
      })
      .addCase(resetState, () => initialState);
  },
});

export default userSlice.reducer;
