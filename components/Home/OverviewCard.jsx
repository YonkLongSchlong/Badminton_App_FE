import { Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color.js";

const OverviewCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>5</Text>
      <Text style={styles.text}>Enrolls</Text>
    </View>
  );
};

export default OverviewCard;

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: "10@s",
    paddingHorizontal: "15@s",
    borderRadius: 10,
    backgroundColor: ColorAccent.secondary,
  },
  number: {
    fontFamily: "Bold",
    fontSize: "16@s",
  },
  text: {
    fontFamily: "Regular",
    fontSize: "10@s",
  },
});
