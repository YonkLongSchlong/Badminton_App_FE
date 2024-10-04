import * as SecureStore from "expo-secure-store";

const getTokenFromSecureStore = SecureStore.getItemAsync("token")
  ? SecureStore.getItemAsync("token")
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
        getTokenFromSecureStore !== null ? getTokenFromSecureStore : ""
    }`,
    Accept: "application/json",
  },
  
};