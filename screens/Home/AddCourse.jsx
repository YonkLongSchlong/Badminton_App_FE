import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useForm } from "react-hook-form";
import FormField from "../../components/Input/FormField";


const AddCourse = () => {
  const { control } = useForm();

  return (
    <View style={styles.container}>
      <FormField
        control={control}
        name="courseName"
        label="Course Name"
        showAsterisk={true}
        placeholder="Enter your course name"
        rules={{ required: "Please enter your course name" }}
      />
      <FormField
        name="courseDetail"
        control={control}
        label="Course Detail"
        showAsterisk={true}
        placeholder="Enter your course detail"
        rules={{ required: "Please enter your course detail" }}
      />
      <FormField
        name="price"
        control={control}
        label="Price"
        showAsterisk={true}
        placeholder="Enter your course price"
        rules={{ required: "Please enter your course price" }}
        secure={true}
      />
      

      <TouchableOpacity style={styles.button} disabled={true}>
        <Text style={styles.buttonText}>Create Course</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCourse;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: '20@s',
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
