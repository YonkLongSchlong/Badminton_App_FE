import { Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useForm } from "react-hook-form";
import ColorAccent from "../../constant/Color.js";
import EditTextInput from "../../components/Input/EditTextInput.jsx";
import { useMutation } from "@tanstack/react-query";
import updatePassword from "../../hooks/Auth/updatePassword.js";
import { errorToast, successToast } from "../../utils/toastConfig.js";
import InputField from "../../components/Input/InputField.jsx";
import { passwordRules } from "../../utils/inputRules.js";

const Password = () => {
  const { control, handleSubmit } = useForm();
  const logout = userStore((state) => state.logout);
  const user = userStore((state) => state.user);
  const token = userStore((state) => state.token);
  const [willLogout, setWillLogout] = useState(false);

  const udpatePasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: async (data, variables) => {
      if (data.status === 400 || data.status === 404) {
        errorToast(data.msg);
      } else {
        setWillLogout(true);
      }
    },
    onError: (data) => {
      errorToast(data.message);
    },
  });

  useEffect(() => {
    if (willLogout) {
      (async () => {
        await logout();
      })();
      successToast(
        "Update notification",
        "Password updated successfully, please sign in again"
      );
    }
  }, [willLogout]);

  const handleUpdatePassword = async ({
    password,
    newPassword,
    confirmPassword,
  }) => {
    const userId = user.id;
    if (newPassword === confirmPassword) {
      await udpatePasswordMutation.mutateAsync({
        userId,
        token,
        password,
        newPassword,
      });
    } else {
      errorToast("Password does not match");
    }
  };

  return (
    <View style={styles.container}>
      <InputField
        name={"password"}
        control={control}
        placeholder={"Enter your current password"}
        label={"Current password"}
        rules={passwordRules}
        secure={true}
      />
      <InputField
        name={"newPassword"}
        control={control}
        placeholder={"Enter your new password"}
        label={"New password"}
        rules={passwordRules}
        secure={true}
      />
      <InputField
        name={"confirmPassword"}
        control={control}
        placeholder={"Confirm your new password"}
        label={"Confirm new password"}
        rules={passwordRules}
        secure={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleUpdatePassword)}
      >
        <Text style={styles.btnText}>Update password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Password;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorAccent.primary,
    padding: "20@s",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: ColorAccent.tertiary,
    borderRadius: 10,
  },
  btnText: {
    fontFamily: "Bold",
    fontSize: "12@s",
    color: ColorAccent.primary,
  },
});
