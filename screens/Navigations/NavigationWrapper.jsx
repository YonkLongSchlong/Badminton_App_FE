import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";


const NavigationWrapper = () => {
  const { token, user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {token !== null && user !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default NavigationWrapper;
