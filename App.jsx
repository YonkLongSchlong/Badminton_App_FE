import "./gesture-handler";
import NavigationWrapper from "./screens/Navigations/NavigationWrapper";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { toastConfig } from "./utils/toastConfig";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import userStore from "./store/userStore";
import { StripeProvider } from "@stripe/stripe-react-native";

const queryClient = new QueryClient();

export default function App({ navigation }) {
  const setUser = userStore((state) => state.setUser);
  const setToken = userStore((state) => state.setToken);
  const [loaded, error] = useFonts({
    "Caveat-Bold": require("./assets/fonts/Caveat-Bold.ttf"),
    Light: require("./assets/fonts/Quicksand-Light.ttf"),
    Regular: require("./assets/fonts/Quicksand-Regular.ttf"),
    Medium: require("./assets/fonts/Quicksand-Medium.ttf"),
    Semibold: require("./assets/fonts/Quicksand-SemiBold.ttf"),
    Bold: require("./assets/fonts/Quicksand-Bold.ttf"),
  });

  useEffect(() => {
    const getAuth = async () => {
      const userInStore = await SecureStore.getItemAsync("User");
      const tokenInStore = await SecureStore.getItemAsync("Token");
      if (userInStore != undefined && tokenInStore != undefined) {
        await setUser(JSON.parse(userInStore));
        await setToken(tokenInStore);
      }
    };
    getAuth();
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_API_KEY}
        merchantDisplayName="Court Companion"
      >
        <NavigationWrapper />
        <Toast config={toastConfig} />
      </StripeProvider>
    </QueryClientProvider>
  );
}
