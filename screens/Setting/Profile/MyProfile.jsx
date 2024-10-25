import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import ColorAccent from "../../../constant/Color.js";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";

const MyProfile = ({ navigation }) => {
  const { user } = useSelector((state) => state?.user);
  console.log("User in myprofile:", user);
  const dob =
    user?.dob === null
      ? new Date(user?.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : new Date(user?.dob).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
  const [avatar, setAvatar] = useState(
    user?.avatar === null
      ? require("../../../assets/4043232_avatar_batman_comics_hero_icon.png")
      : user?.avatar
  );
  const [newAvatar, setNewAvatar] = useState(null);

  const gender = user?.gender === null ? "Other" : user?.gender;
  const selectAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to access the media library."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setNewAvatar({ uri: result.assets[0].uri });
    }
  };

  const saveAvatar = () => {
    if (newAvatar) {
      setAvatar(newAvatar);
      setNewAvatar(null);
      Alert.alert("Success", "Avatar has been updated!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        <TouchableOpacity style={styles.avatarContainer} onPress={selectAvatar}>
          <Image
            style={styles.avatar}
            source={newAvatar ? newAvatar : avatar}
          />
          <Ionicons
            name="image-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoWrapper}>
          <Text style={styles.label}>Full name:</Text>
          <Text style={styles.infoText}>{user?.user_name}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.label}>Date of birth:</Text>
          <Text style={styles.infoText}>{dob}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.infoText}>{gender}</Text>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <AntDesign name="edit" size={24} color="white" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        {/* Nút Save để lưu ảnh sau khi chọn */}
        {newAvatar && (
          <TouchableOpacity style={styles.saveButton} onPress={saveAvatar}>
            <AntDesign name="save" size={24} color="white" />
            <Text style={styles.saveText}>Save Avatar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MyProfile;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorAccent.primary,
    padding: "20@s",
  },
  userInfoSection: {
    alignItems: "center",
    marginBottom: "20@s",
  },
  avatarContainer: {
    position: "relative",
    borderRadius: 80,
    borderWidth: 5,
    borderColor: ColorAccent.tertiary,
    padding: "5@s",
  },
  avatar: {
    width: "110@s",
    height: "110@s",
    borderRadius: 80,
    resizeMode: "cover",
  },
  icon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 12,
    padding: "4@s",
  },
  infoContainer: {
    backgroundColor: ColorAccent.secondary,
    borderRadius: "10@s",
    padding: "20@s",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  infoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "10@s",
  },
  label: {
    fontSize: "14@s",
    fontFamily: "Regular",
    color: "#555",
  },
  infoText: {
    fontSize: "14@s",
    fontFamily: "Bold",
    color: "#000",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ColorAccent.tertiary,
    paddingVertical: "10@s",
    borderRadius: "5@s",
    marginTop: "15@s",
  },
  editText: {
    marginLeft: "8@s",
    fontSize: "14@s",
    color: "white",
    fontFamily: "Bold",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: "10@s",
    borderRadius: "5@s",
    marginTop: "15@s",
  },
  saveText: {
    marginLeft: "8@s",
    fontSize: "14@s",
    color: "white",
    fontFamily: "Bold",
  },
});
