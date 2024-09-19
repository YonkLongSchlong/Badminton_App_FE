import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useForm } from "react-hook-form";
import FormField from "../../components/Input/FormField";
import ColorAccent from "../../constant/Color.js";


const Password = () => {
  const { control } = useForm();

  return (
    <View style={styles.container}>
      
      <FormField
        name="currentPassword"
        control={control}
        label="Current Password"
        showAsterisk={true}
        placeholder="Enter your current password"
        rules={{ required: "Please enter your current password" }}
        secure={true}
      />
      <FormField
        name="newPassword"
        control={control}
        label="New Password"
        showAsterisk={true}
        placeholder="Enter your new password"
        rules={{ required: "Please enter your new password" }}
        secure={true}
      />
      <FormField
        name="confirmPassword"
        control={control}
        label="Confirm Password"
        showAsterisk={true}
        placeholder="Enter your confirm password"
        rules={{ required: "Please enter your confirm password" }}
        secure={true}
      />

      <TouchableOpacity style={styles.button} disabled={true}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Password;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorAccent.primary,
    padding: '20@s',
  },
  button: {
    backgroundColor: ColorAccent.tertiary,
    paddingVertical: '15@s',
    borderRadius: '5@s',
    alignItems: 'center',
    marginTop: '20@s',
  },
  buttonText: {
    color: ColorAccent.primary,
    fontSize: '16@s',
    fontWeight: 'bold',
  },
});
