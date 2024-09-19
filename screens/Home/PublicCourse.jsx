import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useForm } from "react-hook-form";
import FormField from "../../components/Input/FormField";
import ColorAccent from "../../constant/Color.js";


const PublicCourse = () => {
  const { control } = useForm();

  return (
    <View style={styles.container}>
      <FormField
        name="registerStartDate"
        control={control}
        label="Register Start Date"
        showAsterisk={true}
        placeholder="Enter register start date"
        rules={{ required: "Please enter register start date" }}
      />
      <FormField
        name="registerEndDate"
        control={control}
        label="Register End Date"
        showAsterisk={true}
        placeholder="Enter register end date"
        rules={{ required: "Please enter register end date" }}
      />
      <FormField
        name="maximumStudentQuantity"
        control={control}
        label="Maximum Student Quantity"
        showAsterisk={true}
        placeholder="Enter maximum student quantity"
        rules={{ required: "Please enter maximum ttudent quantity" }}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Public Couse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PublicCourse;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorAccent.primary,
    padding: "20@s",
  },
  button: {
    backgroundColor: ColorAccent.tertiary,
    paddingVertical: "15@s",
    borderRadius: "5@s",
    alignItems: "center",
    marginTop: "20@s",
  },
  buttonText: {
    color: ColorAccent.primary,
    fontSize: "16@s",
    fontWeight: "bold",
  },
});
