import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import * as SecureStore from "expo-secure-store";

const getUserFromSecureStore = SecureStore.getItemAsync("User")
  ? SecureStore.getItemAsync("User")
  : null;

const initialState = {
  user: getUserFromSecureStore,
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
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
        state.createdUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },
});

export default userSlice.reducer;
