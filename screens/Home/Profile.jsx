import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, {useContext, useEffect} from "react";
import { ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";
import { SafeAreaView } from "react-native-safe-area-context";
import OverviewCard from "../../components/Home/OverviewCard.jsx";
import SettingCard from "../../components/Home/SettingCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { logout, resetState } from "../../features/auth/authSlice.js";
import AuthContext from "../../context/AuthContext.js";
import * as SecureStore from "expo-secure-store";


const Profile = ({ navigation }) => {
  const {clearAuthData} = useContext(AuthContext);
  const dispatch = useDispatch()

  const reSetSecureStore =  async () =>{
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
  }

  const handleLogout = () => {
     dispatch(logout());
  };


  // const userState = useSelector((state) => state?.auth);
  const { message } = useSelector((state) => state?.auth);

  useEffect(() => {
    if (message === "Logout successful") {
      reSetSecureStore();
      clearAuthData();
      Alert.alert("Logout successful");
    } else if (message === "Logout fail") {
      dispatch(resetState());
      Alert.alert("Logout fail !!!");
    }
  }, [message]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={require("../../assets/4043232_avatar_batman_comics_hero_icon.png")}
            />
          </View>
          <Text style={styles.username}>I'm Batman</Text>
          <View style={styles.roleContainer}>
            <View style={styles.roleWrapper}>
              <Image
                style={styles.roleImage}
                source={require("../../assets/2828920.png")}
              />
              <Text style={styles.roleText}>Participant</Text>
            </View>
          </View>
        </View>

        <View style={styles.overviewSection}>
          <View>
            <Text style={styles.heading}>Overview:</Text>
          </View>
          <View style={styles.overviewCardContainer}>
            <OverviewCard />
            <OverviewCard />
            <OverviewCard />
          </View>
        </View>

        <View style={styles.settingCardSection}>
          <Text style={styles.heading}>Settings:</Text>
          <View style={styles.settingCardContainer}>
            <SettingCard
              icon="person-outline"
              label="Profile"
              onPress={() => navigation.navigate("MyProfile")}
            />
            <SettingCard icon="mail-outline" label="Email" />
            <SettingCard
              icon="shield-checkmark-outline"
              label="Password"
              onPress={() => navigation.navigate("Password")} 
            />
            <SettingCard icon="notifications-outline" label="Notifications" />
            <SettingCard icon="card-outline" label="Payment settings" />
            <SettingCard
              icon="calendar-outline"
              label="Schedule"
              last={true}
              onPress={() => navigation.navigate("Schedule")} 
            />
          </View>
          <View style={styles.settingCardContainer}>
            <SettingCard
              icon="log-out-outline"
              label="Log out"
              last={true}
              onPress={handleLogout}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorAccent.primary,
  },
  userInfoSection: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    borderRadius: 160,
    borderWidth: 5,
    borderColor: ColorAccent.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "110@s",
    height: "110@s",
    resizeMode: "cover",
  },
  username: {
    marginTop: 5,
    fontFamily: "Bold",
    fontSize: "16@s",
  },
  roleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  roleWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: ColorAccent.tertiary,
    paddingHorizontal: "18@s",
    paddingVertical: "6@vs",
    borderRadius: 20,
  },
  roleImage: {
    width: "20@s",
    height: "20@s",
  },
  roleText: {
    color: ColorAccent.primary,
    fontFamily: "Semibold",
    fontSize: "11@s",
  },
  overviewSection: {
    marginTop: 15,
    paddingHorizontal: 25,
  },
  heading: {
    fontFamily: "Bold",
    fontSize: "12@s",
  },
  overviewCardContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
  settingCardSection: {
    width: "full",
    marginTop: 25,
    marginBottom: 25,
    paddingHorizontal: 25,
  },
  settingCardContainer: {
    justifyContent: "space-between",
    backgroundColor: ColorAccent.secondary,
    marginTop: 15,
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderRadius: 10,
    gap: 20,
  },
});
