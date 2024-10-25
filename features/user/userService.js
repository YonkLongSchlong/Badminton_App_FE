import axios from "axios";
import { getConfig } from "../../utils/axiosconfig";
import * as SecureStore from "expo-secure-store";


const updateProfile = async ({ updatedUser, userId }) => {
  const config = await getConfig();
  const response = await axios.patch(
    `${process.env.EXPO_PUBLIC_BASE_URL}users/${userId}`,
    updatedUser,
    config
  );
  if(response.data.data){
    await SecureStore.setItemAsync(
        "user",
        JSON.stringify(response.data.data)
      );
  }
  return response.data.data;
};

const userService = {
  updateProfile,
};
export default userService;
