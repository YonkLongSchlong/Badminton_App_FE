import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import userStore from "../../store/userStore";

const NavigationWrapper = () => {
  const token = userStore((state) => state.token);
  const user = userStore((state) => state.user);

  return (
    <NavigationContainer>
      {token !== null && user !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default NavigationWrapper;
