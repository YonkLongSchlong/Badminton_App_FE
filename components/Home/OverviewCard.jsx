import { Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";
import { useNavigation } from "@react-navigation/native";

const OverviewCard = (props) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    if (props.label === "Ongoing") {
      navigation.navigate("OngoingCourse", { courses: props.courses });
    } else {
      navigation.navigate("FinishedCourse", { courses: props.courses });
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigation}>
      <Text style={styles.number}>{props.courseQuantity}</Text>
      <Text style={styles.text}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export default OverviewCard;

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: "12@s",
    paddingHorizontal: "15@s",
    borderRadius: 10,
    backgroundColor: ColorAccent.secondary,
  },
  number: {
    fontFamily: "Bold",
    fontSize: "16@s",
  },
  text: {
    fontFamily: "Medium",
    fontSize: "10@s",
  },
});
