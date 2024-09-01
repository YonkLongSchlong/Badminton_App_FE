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
    paddingVertical: "15@s",
    paddingHorizontal: "20@s",
    borderRadius: 20,
    backgroundColor: ColorAccent.secondary,
  },
  number: {
    fontFamily: "Bold",
    fontSize: "18@s",
  },
  text: {
    fontFamily: "Regular",
    fontSize: "10@s",
  },
});
