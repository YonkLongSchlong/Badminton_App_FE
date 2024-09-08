import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useForm } from "react-hook-form";
import TextInput from "../../components/Input/TextInput";

const Password = () => {
  const { control } = useForm();

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Current Password </Text>
        <Text style={styles.asterisk}>*</Text>
      </View>
      <TextInput
        name="currentPassword"
        control={control}
        placeholder="Enter your current password"
        rules={{ required: "Please enter your current password" }}
        secure={true}
        style={styles.input}
      />

      <View style={styles.labelContainer}>
        <Text style={styles.label}>New Password </Text>
        <Text style={styles.asterisk}>*</Text>
      </View>
      <TextInput
        name="newPassword"
        control={control}
        placeholder="Enter your new password"
        rules={{ required: "Please enter your new password" }}
        secure={true}
        style={styles.input}
      />

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Confirm Password </Text>
        <Text style={styles.asterisk}>*</Text>
      </View>
      <TextInput
        name="confirmPassword"
        control={control}
        placeholder="Enter your confirm password"
        rules={{ required: "Please enter your confirm password" }}
        secure={true}
        style={styles.input}
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
    backgroundColor: 'white',
    padding: '20@s',
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: '5@s',
  },
  label: {
    fontSize: '14@s',
    color: '#333',
  },
  asterisk: {
    fontSize: '14@s',
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: '5@s',
    padding: '10@s',
    marginBottom: '20@s',
    fontSize: '14@s',
  },
  button: {
    backgroundColor: '#d3d3d3',
    paddingVertical: '15@s',
    borderRadius: '5@s',
    alignItems: 'center',
    marginTop: '20@s',
  },
  buttonText: {
    color: 'white',
    fontSize: '16@s',
    fontWeight: 'bold',
  },
});
