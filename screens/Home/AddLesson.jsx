import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import FormField from "../../components/Input/FormField";
import { useForm } from "react-hook-form";
import ColorAccent from "../../constant/Color.js";


const AddLesson = () => {
  const { control, setValue } = useForm();
  const [videoUri, setVideoUri] = useState(null);

  // Hàm chọn video từ thư viện
  const chooseVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, // Chỉ cho phép chọn video
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  // Hàm xóa video đã chọn
  const removeVideo = () => {
    setVideoUri(null);
  };

  return (
    <View style={styles.container}>
      {/* Title Input */}
      <FormField
          control={control}
          name="title"
          label="Lesson Title"
          showAsterisk={true}
          placeholder="Enter lesson title"
          rules={{ required: "Please enter lesson title" }}
        />

      {/* Choose Video Button */}
      <TouchableOpacity style={styles.button} onPress={chooseVideo}>
        <Text style={styles.buttonText}>Choose Video</Text>
      </TouchableOpacity>

      {/* Video Preview */}
      {videoUri && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewLabel}>Video Preview:</Text>
          <Video
            source={{ uri: videoUri }}
            style={styles.videoPreview}
            useNativeControls
            resizeMode="contain"
          />
          {/* Remove Video Button */}
          <TouchableOpacity style={styles.removeButton} onPress={removeVideo}>
            <Text style={styles.removeButtonText}>Remove Video</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddLesson;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: "20@s",
    backgroundColor: ColorAccent.primary,
  },
  label: {
    fontSize: "16@s",
    fontWeight: 'bold',
    marginBottom: "10@s",
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: "5@s",
    padding: "10@s",
    marginBottom: "20@s",
    fontSize: "16@s",
  },
  button: {
    backgroundColor: ColorAccent.border,
    padding: "10@s",
    borderRadius: "5@s",
    marginBottom: "10@s",
    alignItems: "center"
  },
  buttonText: {
    color: ColorAccent.primary,
    fontSize: "16@s",
    fontWeight: "bold",
  },
  previewContainer: {
    marginTop: "20@s",
  },
  previewLabel: {
    fontWeight: 'bold',
    marginBottom: "10@s",
  },
  videoPreview: {
    width: '100%',
    height: 200,
  },
  removeButton: {
    backgroundColor: ColorAccent.bgCancelButton,
    padding: "10@s",
    borderRadius: "10@s",
    alignItems: 'center',
    marginTop: "10@s",
  },
  removeButtonText: {
    color: ColorAccent.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});