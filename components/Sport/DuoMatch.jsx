import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

export default function DuoMatch({ match, id }) {
  return (
    <TouchableOpacity style={styles.container} id={id} key={id}>
      <View style={styles.dateTextContainer}>
        <Text style={styles.dateText}>
          {new Date(match.sport_event.start_time).toLocaleDateString("en-GB")}
        </Text>
        <Text style={styles.dateText}>
          {new Date("2016-08-11T11:25:00+00:00").toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Text>
      </View>
      <View style={styles.matchInfoContainer}>
        {/* ------------ OPPONENT 1 ------------- */}
        <View style={styles.opponentContainer}>
          <View style={styles.opponentImageContainer}>
            <Image
              style={styles.teamImage}
              source={require("../../assets/avatar.png")}
            />
          </View>
          <View style={styles.opponentNameContainer}>
            <Text style={styles.contesterName}>
              {match.sport_event.competitors[0].name}
            </Text>
          </View>
        </View>

        {/* ------------ VS TEXT  ------------- */}
        {match.sport_event_status.status !== "closed" &&
        match.sport_event_status.status !== "cancelled" ? (
          <View style={styles.vsTextContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>
        ) : match.sport_event_status.status == "canceled" ? (
          <View style={styles.vsTextContainer}>
            <Text style={styles.cancelText}>
              {match.sport_event_status.status}
            </Text>
          </View>
        ) : (
          <View
            style={{ flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <View style={styles.vsTextContainer}>
              <Text style={styles.vsText}>
                {match.sport_event_status.home_score}
              </Text>
              <Text>-</Text>
              <Text style={styles.vsText}>
                {match.sport_event_status.away_score}
              </Text>
            </View>
            <View>
              <Text style={styles.cancelText}>
                {match.sport_event_status.match_status == undefined
                  ? "Cancelled"
                  : match.sport_event_status.match_status
                      .replace(/_/g, " ")
                      .replace(/^./, (char) => char.toUpperCase())}
              </Text>
            </View>
          </View>
        )}

        {/* ------------ OPPONENT 2 ------------- */}
        <View style={styles.opponentContainer}>
          <View style={styles.opponentImageContainer}>
            <Image
              style={styles.teamImage}
              source={require("../../assets/avatar.png")}
            />
          </View>
          <View style={styles.opponentNameContainer}>
            <Text style={styles.contesterName}>
              {match.sport_event.competitors[1].name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
    marginTop: 10,
  },
  dateTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  dateText: {
    fontFamily: "Medium",
    fontSize: "10@s",
  },
  contesterName: {
    fontFamily: "Semibold",
    fontSize: "9@s",
  },
  matchInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  opponentContainer: {
    // backgroundColor: "red",
    flexShrink: 1,
    width: "40%",
    flexDirection: "column",
    alignItems: "center",
  },
  opponentImageContainer: {
    marginBottom: 10,
  },
  opponentNameContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  vsTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  vsText: {
    fontFamily: "Bold",
    fontSize: "13@s",
  },
  cancelText: {
    fontFamily: "Bold",
    fontSize: "11@s",
  },
  teamImage: {
    width: "40@s",
    height: "40@s",
  },
});
