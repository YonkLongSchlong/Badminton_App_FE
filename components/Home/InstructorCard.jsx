import { Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const InstructorList = (props) => {
  const navigation = useNavigation();
  const avatarSrc =
    props.coach.avatar === null
      ? require("../../assets/avatar.png")
      : { uri: props.coach.avatar };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() =>
          navigation.navigate("CoachDescription", {
            coachId: props.coach.id,
          })
        }
      >
        <Image style={styles.image} source={avatarSrc} />
      </TouchableOpacity>
      <Text style={styles.text}>
        {props.coach.firstName + " " + props.coach.lastName}
      </Text>
    </View>
  );
};

export default InstructorList;

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: ColorAccent.secondary,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    marginBottom: 2,
  },
  image: {
    width: "45@s",
    height: "45@s",
    resizeMode: "cover",
    borderRadius: 8,
  },
  text: {
    fontFamily: "Semibold",
    fontSize: "9@s",
  },
});
