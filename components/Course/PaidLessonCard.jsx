import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, ScaledSheet } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { errorToast } from "../../utils/toastConfig";

export const PaidLessonCard = (props) => {
  const navigation = useNavigation();
  const isUnlock = props.paidCourse.unlock;

  const handleNavigation = () => {
    if (isUnlock) {
      navigation.navigate("PaidLesson", { lesson: props.lesson });
    } else {
      errorToast("You will need to unlock the course to continue");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstPart}>
        <TouchableOpacity>
          <Ionicons
            name="play-circle"
            color={ColorAccent.light_tertiary}
            size={scale(46)}
            onPress={handleNavigation}
          />
        </TouchableOpacity>

        <View style={styles.lessonInfoContainer}>
          <Text style={styles.subHeading} numberOfLines={1}>
            {props.lesson.name}
          </Text>
        </View>
      </View>
      {isUnlock ? (
        <TouchableOpacity style={styles.secondPart}>
          <MaterialIcons name="pending" size={scale(14)} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.secondPart}>
          <MaterialIcons name="lock-outline" size={scale(14)} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  firstPart: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  lessonInfoContainer: {
    width: "65%",
  },
  secondPart: {
    backgroundColor: ColorAccent.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    padding: 6,
  },
  heading: {
    fontFamily: "Bold",
    fontSize: "14@s",
  },
  subHeading: {
    fontFamily: "Bold",
    fontSize: "11@s",
  },
  text: {
    fontFamily: "Regular",
    fontSize: "11@s",
  },
  subText: {
    fontFamily: "Regular",
    fontSize: "9@s",
  },
  iconUpdate: {
    backgroundColor: ColorAccent.bgUpdateButton,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    padding: 6,
    marginRight: 6,
  },
  iconDelete: {
    backgroundColor: ColorAccent.bgCancelButton,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    padding: 6,
    marginRight: 6,
  },
});
