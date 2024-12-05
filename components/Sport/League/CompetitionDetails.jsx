import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import * as Progress from "react-native-progress";
import Color from "../../../constant/Color";

const WIDTH = Dimensions.get("window").width;

export default function CompetitionDetails({ competition, season }) {
  const startLeague = new Date(season.start_date);
  const endLeague = new Date(season.end_date);
  const totalDuration = endLeague - startLeague;
  const elapsedDuration = new Date() - startLeague;
  const progress = (elapsedDuration / totalDuration) * 100;

  const formattedStartDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
  }).format(new Date(season.start_date));
  const formattedEndDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
  }).format(new Date(season.end_date));

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.header}>{competition.name}</Text>
        <View style={styles.leagueNameContainer}>
          <Image
            style={styles.image}
            source={require("../../../assets/international.png")}
          />
          <Text style={styles.classNameText}>{competition.category.name}</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <Progress.Bar
            color={Color.tertiary}
            progress={progress}
            width={WIDTH}
          />
          <View style={styles.dateTextContainer}>
            <Text style={styles.dateText}>{formattedStartDate}</Text>
            <Text style={styles.dateText}>{formattedEndDate}</Text>
          </View>
        </View>
        <View style={styles.currentChampContainer}>
          <Text style={styles.header}>Current Champion</Text>
          <View style={styles.avatarHolder}>
            <Text style={styles.champNameText}></Text>
          </View>
          {/* <Text>{league.current_champion_team_name}</Text> */}
        </View>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 15,
  },
  header: {
    fontFamily: "Bold",
    fontSize: "12@s",
  },
  detailsContainer: {
    flexDirection: "column",
    gap: 15,
  },
  leagueNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: "22@s",
    height: "22@s",
  },
  classNameText: {
    fontFamily: "Semibold",
    fontSize: "11@s",
  },
  progressBarContainer: {
    marginTop: 5,
    width: "100%",
    alignItems: "center",
  },
  dateTextContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  dateText: {
    fontFamily: "Medium",
    fontSize: "11@s",
  },
  currentChampContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
  avatarHolder: {
    justifyContent: "center",
    alignItems: "center",
    width: "47@s",
    height: "47@s",
    borderRadius: 200,
    backgroundColor: Color.light_tertiary,
  },
  champNameText: {
    fontFamily: "Semibold",
    fontSize: "11@s",
    color: "black",
  },
});
