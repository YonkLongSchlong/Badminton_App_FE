import axios from "axios";
import * as SecureStore from "expo-secure-store";

const login = async (user) => {
  const response = await axios.post(
    process.env.EXPO_PUBLIC_BASE_URL + `auth/login`,
    user
  );
  if (response.data) {
    await SecureStore.setItemAsync(
      "user",
      JSON.stringify(response.data.person)
    );
    await SecureStore.setItemAsync(
      "token",
      JSON.stringify(response.data.token)
    );
  }
  return response.data;
};

const verifyOTP = async (data) => {
  const response = await axios.post(
    process.env.EXPO_PUBLIC_BASE_URL + `auth/verify-otp`,
    data
  );
  return response.data;
};

const forgotPassword = async (data) => {
  const response = await axios.post(
    process.env.EXPO_PUBLIC_BASE_URL + `auth/forgot-password`,
    data
  );
  return response.data;
};

const resetPassword = async (data) => {
  const response = await axios.post(
    process.env.EXPO_PUBLIC_BASE_URL + `auth/reset-password`,
    data
  );
  return response.data;
};

const logout = async () => {
  const response = await axios.post(
    process.env.EXPO_PUBLIC_BASE_URL + `auth/logout`
  );
  return response.data;
};

const registerUser = async (user) => {
  const response = await axios.post(
    process.env.EXPO_PUBLIC_BASE_URL + `users/register`,
    user
  );
  return response.data;
};

const authService = {
  login,
  verifyOTP,
  forgotPassword,
  resetPassword,
  logout,
  registerUser,
};
export default authService;
