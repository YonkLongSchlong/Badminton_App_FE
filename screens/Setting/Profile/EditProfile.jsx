import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import DateTimePicker from "@react-native-community/datetimepicker";
import ColorAccent from "../../../constant/Color.js";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Picker } from "@react-native-picker/picker";

const EditProfile = ({ navigation }) => {
  const [fullName, setFullName] = useState("I'm Batman");
  const [dateOfBirth, setDateOfBirth] = useState(new Date(2003, 7, 8)); // 08/08/2003
  const [gender, setGender] = useState("Men");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    // Lưu thông tin cập nhật
    Alert.alert(
      "Profile Updated",
      "Your profile has been successfully updated!"
    );
    navigation.goBack();
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full name:</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of birth:</Text>
        <TouchableOpacity onPress={showDatePickerModal} style={styles.input}>
          <Text>{dateOfBirth.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || dateOfBirth;
              setShowDatePicker(false);
              setDateOfBirth(currentDate);
            }}
          />
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Men" value="Men" />
            <Picker.Item label="Women" value="Women" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <AntDesign name="save" size={24} color="white" />
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorAccent.primary,
    padding: "20@s",
  },
  header: {
    fontSize: "18@s",
    fontFamily: "Bold",
    marginBottom: "20@s",
    textAlign: "center",
    color: "#000",
  },
  inputGroup: {
    marginBottom: "20@s",
  },
  label: {
    fontSize: "14@s",
    marginBottom: "5@s",
    fontFamily: "Regular",
    color: "#555",
  },
  input: {
    backgroundColor: "white",
    padding: "10@s",
    borderRadius: "5@s",
    fontSize: "14@s",
    borderColor: ColorAccent.tertiary,
    borderWidth: "1@s",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: "5@s",
    borderWidth: "1@s",
    borderColor: ColorAccent.tertiary,
  },
  picker: {
    height: "40@s",
  },
  saveButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorAccent.tertiary,
    paddingVertical: "12@s",
    borderRadius: "5@s",
    marginTop: "20@s",
  },
  saveButtonText: {
    marginLeft: "8@s",
    fontSize: "16@s",
    color: "white",
    fontFamily: "Bold",
  },
});
