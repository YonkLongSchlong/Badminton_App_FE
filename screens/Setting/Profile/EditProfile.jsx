import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
} from "react-native";
import EditTextInput from "../../../components/Input/EditTextInput";
import Color from "../../../constant/Color";
import userStore from "../../../store/userStore";
import { ScaledSheet } from "react-native-size-matters";
import { Camera } from "lucide-react-native";
import { errorToast, successToast } from "../../../utils/toastConfig";
import updateUser from "../../../hooks/User/updateUser";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import updateAvatar from "../../../hooks/User/updateAvatar";

export default function Edit({navigation}) {
  const user = userStore((state) => state.user);
  const token = userStore((state) => state.token);
  const setUser = userStore((state) => state.setUser);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [dob, setDob] = useState(new Date(user.dob));
  const [gender, setGender] = useState(user.gender === null ? "Male" : "Female");
  const [isMale, setIsMale] = useState(user.gender === "Male" ? true : false);
  const [isFemale, setIsFemale] = useState(
    user.gender === "Female" ? true : false
  );

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      if (data.status === 400 || data.status === 404) {
        errorToast(data.msg);
      } else {
        setUser(data.data);
        navigation.navigate("Profile");
        successToast("Update profile", data.msg);
      }
    },
    onError: (data) => {
      errorToast(data.message);
    },
  });

  const handleUpdate = () => {
    const id = user.id;
    isMale ? setGender("Male") : setGender("Female");
    updateMutation.mutate({
      id,
      firstName,
      lastName,
      email,
      dob,
      gender,
      token,
      setUser,
    });
  };

  const avatarMutation = useMutation({
    mutationFn: updateAvatar,
    onSuccess: async (data) => {
      if (data.status === 400 || data.status === 404) {
        errorToast(data.msg);
      } else {
        setUser(data.data)
        navigation.navigate("Profile");
        successToast("Update avatar", data.msg);
      }
    },
    onError: (data) => {
      errorToast(data.message);
    },
  });

  const handleUploadImage = async () => {
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      handleUpdateImage(user, token, result);
    }
  };

  const handleUpdateImage = async (user, token, result) => {
    if (!result.canceled) {
      const fileMime = result.assets[0].type;
      const fileType = result.assets[0].uri.split(".").pop();

    const options = {
      uri: `${result.assets[0].uri}`,
      name: `${user.id}-${Date.now().toString()}.${fileType}`,
      type: `${fileMime}/${fileType}`,
    };

    let formData = new FormData();
    formData.append("image", options);

    const id = user.id;
      avatarMutation.mutate({ id, formData, token });
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDob(currentDate);
  };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: dob,
      onChange,
      mode: "date",
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      automaticallyAdjustKeyboardInsets={true}
    >
      <StatusBar style="dark" />

      {/* ------------ AVATAR SECTION ------------- */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarBorder}>
          {user.avatar == null ? (
            <Image
              style={styles.avatar}
              source={
                user.avatar == null
                  ? require("../../../assets/4043232_avatar_batman_comics_hero_icon.png")
                  : { uri: user.avatar }
              }
            />
          ) : (
            <Image style={styles.avatar} source={{ uri: user.avatar }} />
          )}

          <TouchableOpacity style={styles.addBtn} onPress={handleUploadImage}>
            <Camera size={24} color={Color.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ------------ INPUT SECTION ------------- */}
      <View style={styles.inputContainer}>
        <EditTextInput
          label={"First name"}
          ecrypted={false}
          value={firstName}
          setValue={setFirstName}
          editable={true}
        />
        <EditTextInput
          label={"Last name"}
          ecrypted={false}
          value={lastName}
          setValue={setLastName}
          editable={true}
        />
        <EditTextInput
          label={"Email"}
          ecrypted={false}
          value={email}
          setValue={setEmail}
          editable={true}
        />
        <TouchableOpacity onPress={showMode}>
          <EditTextInput
            label={"Date of birth"}
            ecrypted={false}
            value={dob.toLocaleDateString("it-IT")}
            setValue={setDob}
            editable={false}
          />
        </TouchableOpacity>
        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxSection}>
            <Checkbox
              style={styles.checkbox}
              value={isMale}
              onValueChange={() => {
                setIsFemale(false);
                setIsMale(true);
                setGender("Male");
              }}
              color={isMale ? Color.tertiary : undefined}
            />
            <Text style={styles.checkboxText}>Male</Text>
          </View>
          <View style={styles.checkboxSection}>
            <Checkbox
              style={styles.checkbox}
              value={isFemale}
              onValueChange={() => {
                setIsFemale(true);
                setIsMale(false);
                setGender("Female");
              }}
              color={isFemale ? Color.tertiary : undefined}
            />
            <Text style={styles.checkboxText}>Female</Text>
          </View>
        </View>
      </View>

      {/* ------------ UPDATE BUTTON ------------- */}
      <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
        <Text style={styles.btnText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Color.primary,
  },
  avatarContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarBorder: {
    borderWidth: 4,
    borderColor: ColorAccent.tertiary,
    borderRadius: 164,
    width: "123@s",
    height: "123@s",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "110@s",
    height: "110@s",
    borderRadius: 150,
    resizeMode: "cover",
  },
  addBtn: {
    backgroundColor: Color.tertiary,
    padding: 10,
    borderRadius: 70,
    position: "absolute",
    bottom: -10,
    right: 20,
  },
  inputContainer: {
    marginVertical: 50,
    gap: 15,
    paddingHorizontal: 30,
  },
  checkboxContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 100,
  },
  checkboxSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    backgroundColor: Color.primary,
    borderRadius: 10,
    padding: 10,
    fontSize: "10@s",
    borderColor: Color.white,
    borderWidth: 1,
  },
  checkboxText: {
    fontFamily: "Bold",
    fontSize: "11@s",
  },
  updateBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: Color.tertiary,
    borderRadius: 10,
  },
  btnText: {
    fontFamily: "Bold",
    fontSize: "12@s",
    color: Color.primary,
  },
});
