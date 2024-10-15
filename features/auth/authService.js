import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";
import * as SecureStore from "expo-secure-store";

const login = async (user) => {
  const response = await axios.post(process.env.EXPO_PUBLIC_BASE_URL +`auth/login`, user);
  if (response.data) {
    SecureStore.setItemAsync("User", JSON.stringify(response.data));
  }
  if (response.data.token) {
    SecureStore.setItemAsync("token", JSON.stringify(response.data));
  }
  console.log(SecureStore.getItemAsync("User"));
  return response.data;
};

const authService = {
  login,
};
export default authService;
