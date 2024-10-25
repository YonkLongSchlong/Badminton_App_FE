import * as SecureStore from "expo-secure-store";

export const getConfig = async () => {
  const token = await SecureStore.getItemAsync("token");
  
  // Loại bỏ dấu ngoặc kép nếu chúng tồn tại trong token
  const formattedToken = token ? token.replace(/^"|"$/g, "") : "";

  return {
    headers: {
      Authorization: `Bearer ${formattedToken}`,
      Accept: "application/json",
    },
  };
};
