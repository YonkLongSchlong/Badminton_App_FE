import React from "react";
import { Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Color from "../../../constant/Color";

export default function KnockoutCard({ match }) {
  const formatImageName = (opponent1) => {
    return opponent1.slice(0, 2).toUpperCase();
  };
  const formatOpponentName = (opponent1) => {
    return opponent1.slice(0, 3);
  };

  return (
    <View style={styles.card} key={match.id}>
      <View style={styles.opponentsContainer}>
        <View style={styles.opponentContainer}>
          <View style={styles.imageHolder}>
            <Text style={styles.imageText}>
              {formatImageName(match.sport_event.competitors[0].name)}
            </Text>
          </View>
          <Text style={styles.opponentName}>
            {formatOpponentName(match.sport_event.competitors[0].name)}
          </Text>
        </View>
        <View style={styles.opponentContainer}>
          <View style={styles.imageHolder}>
            <Text style={styles.imageText}>
              {formatImageName(match.sport_event.competitors[1].name)}
            </Text>
          </View>
          <Text style={styles.opponentName}>
            {formatOpponentName(match.sport_event.competitors[1].name)}
          </Text>
        </View>
      </View>
      <View style={styles.scoreContainer}>
        <Text
          style={
            match.sport_event_status.home_score >
            match.sport_event_status.away_score
              ? styles.winScoreText
              : styles.loseScoreText
          }
        >
          {match.sport_event_status.home_score}
        </Text>
        <Text style={styles.loseScoreText}>:</Text>
        <Text
          style={
            match.sport_event_status.away_score >
            match.sport_event_status.home_score
              ? styles.winScoreText
              : styles.loseScoreText
          }
        >
          {match.sport_event_status.away_score}
        </Text>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  card: {
    flexDirection: "column",
    justifyContent: "center",
    width: "65@s",
    height: "65@vs",
    backgroundColor: Color.secondary,
    borderRadius: 5,
    paddingTop: 3,
    paddingHorizontal: 3,
  },
  opponentsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  opponentContainer: {
    gap: 5,
    flexDirection: "column",
    justifyContent: "center",
  },
  imageHolder: {
    width: "25@s",
    height: "25@s",
    backgroundColor: Color.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    fontFamily: "Bold",
    fontSize: "8@s",
  },
  opponentName: {
    fontFamily: "Medium",
    fontSize: "10@s",
    textAlign: "center",
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  loseScoreText: {
    fontFamily: "Medium",
    fontSize: "12@s",
  },
  winScoreText: {
    fontFamily: "Bold",
    fontSize: "12@s",
  },
});
