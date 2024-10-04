import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";
import * as SecureStore from "expo-secure-store";

const register = async (user) => {
  const response = await axios.post(`${base_url}users/register`, user);
  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${base_url}users/login`, user);
  if (response.data) {
    SecureStore.setItemAsync("User", JSON.stringify(response.data));
  }
  if (response.data.token) {
    SecureStore.setItemAsync("token", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
  login,
};
export default authService;
