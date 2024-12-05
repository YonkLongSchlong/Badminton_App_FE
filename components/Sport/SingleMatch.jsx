import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

export default function SingleMatch({ match, id }) {
  const replaceUnderscore = (string) => {
    if (string == undefined) return "Cancelled";
    return string
      .replace(/[\s_]+/g, " ")
      .replace(/^./, (match) => match.toUpperCase());
  };

  return (
    <TouchableOpacity style={styles.container} key={id}>
      {/* ------------ MATCH DATE AND TIME ------------- */}
      <View style={styles.dateTextContainer}>
        <Text style={styles.dateText}>
          {new Date(match.sport_event.start_time).toLocaleTimeString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Text>
        <View style={styles.roundAndTimeContainer}>
          {match.sport_event.sport_event_context.round?.number !== undefined ? (
            <Text style={styles.dateText}>
              Round: {match.sport_event.sport_event_context.round?.number}
            </Text>
          ) : (
            <Text style={styles.dateText}>
              {replaceUnderscore(
                match.sport_event.sport_event_context.round?.name
              )}
            </Text>
          )}
        </View>
      </View>

      {/* ------------ MATCH INFO ------------- */}
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
            <Text numberOfLines={1} style={styles.contesterName}>
              {match.sport_event.competitors[0].name}
            </Text>
          </View>
        </View>

        {/* ------------ VS TEXT  ------------- */}
        <View>
          {match.sport_event_status.status !== "closed" &&
          match.sport_event_status.status !== "cancelled" ? (
            <View style={[styles.vsTextContainer]}>
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
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: -10,
                gap: 10,
              }}
            >
              <View style={[styles.vsTextContainer]}>
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
        </View>

        {/* ------------ OPPONENT 2 ------------- */}
        <View style={styles.opponentContainer}>
          <View style={styles.opponentImageContainer}>
            <Image
              style={styles.teamImage}
              source={require("../../assets/avatar.png")}
            />
          </View>
          <View style={styles.opponentNameContainer}>
            <Text numberOfLines={1} style={styles.contesterName}>
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
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
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
    paddingHorizontal: 8,
    paddingVertical: 20,
    gap: 5,
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
