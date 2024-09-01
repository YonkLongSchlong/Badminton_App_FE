import { Image, Text, View } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";
import { SafeAreaView } from "react-native-safe-area-context";
import OverviewCard from "../../components/Home/OverviewCard.jsx";
import SettingCard from "../../components/Home/SettingCard.jsx";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
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
            <View style={styles.roleImageContainer}>
              <Image
                style={styles.roleImage}
                source={require("../../assets/2828920.png")}
              />
            </View>
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
        <View style={styles.settingCardContainer}>
          <SettingCard icon={"person-outline"} label="Profile" />
          <SettingCard icon={"notifications-outline"} label="Notifications" />
          <SettingCard icon={"card-outline"} label="Payment settings" />
          <SettingCard icon={"calendar-outline"} label="Schedule" />
          <SettingCard icon={"shield-checkmark-outline"} label="Password" />
        </View>
      </View>
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
    width: "150@s",
    height: "150@s",
    resizeMode: "cover",
  },
  username: {
    marginTop: 5,
    fontFamily: "Bold",
    fontSize: "20@s",
  },
  roleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  roleWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorAccent.tertiary,
    paddingHorizontal: "18@s",
    paddingVertical: "6@vs",
    borderRadius: 20,
  },
  roleImageContainer: {
    position: "absolute",
    left: 20,
    bottom: 10,
  },
  roleImage: {
    width: "30@s",
    height: "30@s",
  },
  roleText: {
    marginLeft: "40@s",
    color: ColorAccent.primary,
    fontFamily: "Semibold",
    fontSize: "12@s",
  },
  overviewSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontFamily: "Bold",
    fontSize: "14@s",
  },
  overviewCardContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "28@s",
  },
  settingCardSection: {
    marginTop: 25,
    flex: 1,
  },
  settingCardContainer: {
    height: "100%",
    justifyContent: "center",
    gap: 30,
    backgroundColor: ColorAccent.secondary,
    borderTopEndRadius: 70,
    borderTopStartRadius: 70,
    paddingHorizontal: 45,
    paddingVertical: 40,
  },
});
