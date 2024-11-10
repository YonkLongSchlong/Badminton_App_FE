import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useForm } from "react-hook-form";

import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import ColorAccent from "../../constant/Color.js";
import Color from "../../constant/Color.js";

const AddCourse = () => {
  const { control, setValue } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const pickImage = async () => {
    // Mở thư viện ảnh và chọn ảnh
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // Kiểm tra nếu người dùng không hủy chọn ảnh
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Lưu đường dẫn ảnh đã chọn
    }
  };
  const removeImage = () => {
    setSelectedImage(null);
  };

  // Update form value with selected date
  const handleDateChange = (event, selectedDate, setDate, setShow) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      setValue(event.target.name, selectedDate.toISOString().split("T")[0]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Course Name */}
        {/* <FormField
          control={control}
          name="courseName"
          label="Course Name"
          showAsterisk={true}
          placeholder="Enter your course name"
          rules={{ required: "Please enter your course name" }}
        /> */}

        {/* Course Detail */}
        {/* <FormField
          name="courseDetail"
          control={control}
          label="Course Detail"
          showAsterisk={true}
          placeholder="Enter your course detail"
          rules={{ required: "Please enter your course detail" }}
          multiline={true}
          numberoflines={5}
          style={styles.multiLineInput}
        /> */}

        {/* Price */}
        {/* <FormField
          name="price"
          control={control}
          label="Price"
          showAsterisk={true}
          placeholder="Enter your course price"
          rules={{ required: "Please enter your course price" }}
        /> */}

        {/* Course image */}

        <TouchableOpacity style={styles.btnChooseImage} onPress={pickImage}>
          <Text style={styles.buttonText}>Choose Image</Text>
        </TouchableOpacity>

        {selectedImage && (
          <View>
            <View style={styles.previewWrapper}>
              <Text style={styles.previewLabel}>Image Preview:</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={removeImage}
              >
                <Text style={styles.removeButtonText}>Remove Image</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: selectedImage }}
              style={styles.imagePreview}
            />
          </View>
        )}

        {/* Start Date and End Date */}
        <View style={styles.rowContainer}>
          <View style={styles.column}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Start Date</Text>
              <Text style={styles.asterisk}>*</Text>
            </View>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
              <Text style={styles.input}>
                {startDate.toISOString().split("T")[0]}
              </Text>
            </TouchableOpacity>
          </View>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, date) =>
                handleDateChange(
                  event,
                  date,
                  setStartDate,
                  setShowStartDatePicker
                )
              }
            />
          )}

          <View style={styles.column}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>End Date</Text>
              <Text style={styles.asterisk}>*</Text>
            </View>
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
              <Text style={styles.input}>
                {endDate.toISOString().split("T")[0]}
              </Text>
            </TouchableOpacity>
          </View>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, date) =>
                handleDateChange(event, date, setEndDate, setShowEndDatePicker)
              }
            />
          )}
        </View>

        {/* Category and Type */}
        <View style={styles.rowContainer}>
          <View style={styles.column}>
            {/* <FormField
              name="category"
              control={control}
              label="Category"
              showAsterisk={true}
              rules={{ required: "Please enter your category name" }}
            /> */}
          </View>
          <View style={styles.column}>
            {/* <FormField
              name="type"
              control={control}
              label="Type"
              showAsterisk={true}
              rules={{ required: "Please enter your type name" }}
            /> */}
          </View>
        </View>

        <TouchableOpacity style={styles.button} disabled={true}>
          <Text style={styles.buttonText}>Create Course</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddCourse;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    padding: "20@s",
    backgroundColor: ColorAccent.primary,
  },
  header: {
    fontSize: "18@s",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20@s",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5@s",
  },
  label: {
    fontSize: "14@s",
    color: "#333",
    marginBottom: 5,
  },
  asterisk: {
    fontSize: "14@s",
    color: "red",
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: "5@s",
    padding: "10@s",
    marginBottom: "15@s",
    fontSize: "14@s",
    backgroundColor: ColorAccent.primary,
  },
  multiLineInput: {
    height: "100@s",
    textAlignVertical: "top",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "5@s",
    gap: "10@s",
  },
  column: {
    flex: 1,
  },
  button: {
    backgroundColor: ColorAccent.tertiary,
    paddingVertical: "15@s",
    borderRadius: "10@s",
    alignItems: "center",
    marginBottom: "10@s",
  },
  buttonText: {
    color: ColorAccent.primary,
    fontSize: "16@s",
    fontWeight: "bold",
  },
  imagePreview: {
    width: "100%",
    height: "200@s",
    marginTop: "10@s",
    borderRadius: "5@s",
    marginBottom: "5@s",
  },
  btnChooseImage: {
    backgroundColor: ColorAccent.border,
    padding: "10@s",
    borderRadius: "5@s",
    marginBottom: "10@s",
    alignItems: "center",
  },
  previewWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  previewLabel: {
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: ColorAccent.bgCancelButton,
    padding: "10@s",
    borderRadius: "10@s",
    alignItems: "center",
    marginVertical: "10@s",
  },
  removeButtonText: {
    color: ColorAccent.primary,
    fontSize: "16@s",
    fontWeight: "bold",
  },
});
