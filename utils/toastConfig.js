import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import Color from "../constant/Color";
import { s, vs } from "react-native-size-matters";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        marginTop: 35,
        borderLeftColor: Color.tertiary,
        width: "80%",
        height: vs(45),
      }}
      contentContainerStyle={{ paddingHorizontal: 25 }}
      text1Style={{
        fontSize: s(11),
        fontFamily: "Bold",
      }}
      text2Style={{
        fontSize: s(10),
        fontFamily: "Semibold",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        marginTop: 35,
        borderLeftColor: "red",
        width: "80%",
        height: vs(45),
      }}
      contentContainerStyle={{ paddingHorizontal: 25 }}
      text1Style={{
        fontSize: s(11),
        fontFamily: "Bold",
      }}
      text2Style={{
        fontSize: s(10),
        fontFamily: "Semibold",
      }}
    />
  ),
};

export const successToast = (header, message) => {
  return Toast.show({
    type: "success",
    text1: header,
    text2: message,
  });
};

export const errorToast = (message) => {
  return Toast.show({ type: "error", text1: "Error", text2: message });
};
