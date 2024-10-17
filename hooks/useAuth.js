import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const getUserFromStorage = async () => {
    const storedUser = await SecureStore.getItemAsync("user");
    const storedToken = await SecureStore.getItemAsync("token");
    setUser(storedUser);
    setToken(storedToken);
  };

  const login = async (userData, userToken) => {
    console.log("Logout call");
    await SecureStore.setItemAsync("user", userData);
    await SecureStore.setItemAsync("token", userToken);
    setUser(userData);
    setToken(userToken);
  };

  const logout = async () => {
    await SecureStore.removeItemAsync("user");
    await SecureStore.removeItemAsync("token");
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    getUserFromStorage();
  }, []);

  return { user, token, login, logout };
};

export default useAuth;
