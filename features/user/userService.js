import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const register = async (user) => {
  const response = await axios.post(`${base_url}users/register`, user);
  return response.data;
};

const userService = {
  register,
};
export default userService;
