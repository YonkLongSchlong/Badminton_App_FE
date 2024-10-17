import axios from "axios";
import { config } from "../../utils/axiosconfig";

const register = async (user) => {
  const response = await axios.post(process.env.EXPO_PUBLIC_BASE_URL +`users/register`, user);
  return response.data;
};

const userService = {
  register,
};
export default userService;
