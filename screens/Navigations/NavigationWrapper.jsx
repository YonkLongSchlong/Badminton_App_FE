import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import useAuth from "../../hooks/useAuth";

const NavigationWrapper = () => {
  const { user, token } = useAuth();

  return (
    <NavigationContainer>
      {token !== null && user !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default NavigationWrapper;
