import { createSlice, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import userService from "./userService";


const initialState = {
  user: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const loadUserFromSecureStore = createAsyncThunk(
  "user/load-user-from-SecureStore",
  async (_, thunkAPI) => {
    try {
      const storedUser = await SecureStore.getItemAsync("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      const message = error.message || "Failed to load user";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
    "user/update-profile",
    async (user, thunkAPI) => {
      try {
        return await userService.updateProfile(user);
      } catch (error) {
        const message = error.message || "Network Error";
        return thunkAPI.rejectWithValue(message);
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
    .addCase(loadUserFromSecureStore.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loadUserFromSecureStore.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    })
    .addCase(loadUserFromSecureStore.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })
    .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
    .addCase(resetState, () => initialState);
    
  },
});

export default userSlice.reducer;
