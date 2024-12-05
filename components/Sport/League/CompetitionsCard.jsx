import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

export default function CompetitionCard({ competition }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      key={competition.id}
      onPress={() =>
        navigation.navigate("Competition", { competition: competition })
      }
    >
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/course_banner.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.competitionsName}>{competition.name}</Text>
        <Text style={styles.className}>
          <Text style={{ fontFamily: "Bold" }}>Class:</Text>{" "}
          {competition.category.name}
        </Text>
        <Text style={styles.className}>
          <Text style={{ fontFamily: "Bold" }}>Gender:</Text>{" "}
          {competition.gender.replace(/^./, (char) => char.toUpperCase())}
        </Text>
        <Text style={styles.className}>
          <Text style={{ fontFamily: "Bold" }}>Type:</Text>{" "}
          {competition.type
            .replace(/_/g, " ")
            .replace(/^./, (char) => char.toUpperCase())}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 10,
  },
  imageContainer: {},
  image: {
    width: "70@s",
    height: "70@s",
    borderRadius: 8,
  },
  infoContainer: {
    flexShrink: 1,
  },
  competitionsName: {
    fontFamily: "Bold",
    fontSize: "12@s",
  },
  leagueName: {
    fontFamily: "Semibold",
    fontSize: "10@s",
  },
  italicClassName: {
    fontFamily: "Bold",
    fontStyle: "italic",
  },
  className: {
    fontFamily: "Semibold",
    fontSize: "10@s",
  },
});
