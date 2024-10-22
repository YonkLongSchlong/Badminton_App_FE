import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const loadAuthData = async () => {
    try {
      const storedUser = await SecureStore.getItemAsync("user");
      const storedToken = await SecureStore.getItemAsync("token");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      setToken(storedToken);
    } catch (error) {
      console.error("Error getting auth data", error);
    }
  };

  const storeAuthData =  (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  const clearAuthData =  () => {
      setUser(null);
      setToken(null);
  };

  useEffect(() => {
    loadAuthData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, storeAuthData, clearAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 
