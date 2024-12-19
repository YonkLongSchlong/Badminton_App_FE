import { Image, Text, View } from "react-native";
import { LogBox } from "react-native";

LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop']);
import { ScaledSheet } from "react-native-size-matters";
import Color from "../../constant/Color";
import KnockoutCard from "./Knockout/KnockoutCard";

export default function Knockout({ matches }) {
  const numberOfRoundsOf16 = matches.filter(
    (match) =>
      match.sport_event.sport_event_context?.round?.name === "round_of_16"
  ).length;

  const numberOfQuarterFinal = matches.filter(
    (match) =>
      match.sport_event.sport_event_context?.round?.name === "quarterfinal"
  ).length;

  const roundOf16MatchesFirstLine = matches
    .filter(
      (match) =>
        match.sport_event.sport_event_context?.round?.name === "round_of_16"
    )
    .slice(
      0,
      numberOfRoundsOf16 % 2 === 0
        ? numberOfRoundsOf16 / 2
        : Math.floor(numberOfRoundsOf16 / 2) + 1
    );

  const roundOf16MatchesSecondLine = matches
    .filter(
      (match) =>
        match.sport_event.sport_event_context?.round?.name === "round_of_16"
    )
    .slice(
      numberOfRoundsOf16 % 2 === 0
        ? numberOfRoundsOf16 / 2
        : Math.floor(numberOfRoundsOf16 / 2) + 1,
      numberOfRoundsOf16
    );

  const quarterFinalMatchesFirstLine = matches
    .filter(
      (match) =>
        match.sport_event.sport_event_context?.round?.name === "quarterfinal"
    )
    .slice(0, 2);

  const quarterFinalMatchesSecondLine = matches
    .filter(
      (match) =>
        match.sport_event.sport_event_context?.round?.name === "quarterfinal"
    )
    .slice(2, numberOfQuarterFinal);

  const semiFinalMatchesFirstLine = matches
    .filter(
      (match) =>
        match.sport_event.sport_event_context?.round?.name === "semifinal"
    )
    .slice(0, 1);

  const semiFinalMatchesSecondLine = matches
    .filter(
      (match) =>
        match.sport_event.sport_event_context?.round?.name === "semifinal"
    )
    .slice(1, 2);

  const final = matches.filter(
    (match) => match.sport_event.sport_event_context?.round?.name === "final"
  );

  return (
    <View style={styles.container}>
      {/* -------------- ROUND OF 16 FIRST LINE ------------- */}
      <View style={styles.roundLine}>
        {roundOf16MatchesFirstLine.map((match) => (
          <KnockoutCard match={match} key={match.id} />
        ))}
      </View>

      {/* -------------- QUARTER FINAL FIRST LINE ------------- */}
      <View style={styles.roundLine}>
        {quarterFinalMatchesFirstLine.map((match) => (
          <KnockoutCard match={match} key={match.id} />
        ))}
      </View>

      {/* -------------- SEMI FINAL FIRST LINE ------------- */}
      <View style={styles.roundLine}>
        {semiFinalMatchesFirstLine.map((match) => (
          <KnockoutCard match={match} key={match.id} />
        ))}
      </View>

      {/* -------------- FINAL FIRST LINE ------------- */}
      <View style={styles.roundLine}>
        <View style={styles.finalContainer}>
          <Image
            source={require("../../assets/trophy.png")}
            style={styles.image}
          />
          {final.map((match) => (
            <KnockoutCard match={match} key={match.id} />
          ))}
        </View>
      </View>

      {/* -------------- SEMI FINAL FIRST LINE ------------- */}
      <View style={styles.roundLine}>
        {semiFinalMatchesSecondLine.map((match) => (
          <KnockoutCard match={match} key={match.id} />
        ))}
      </View>

      {/* -------------- QUARTER FINAL SECOND LINE ------------- */}
      <View style={styles.roundLine}>
        {quarterFinalMatchesSecondLine.map((match) => (
          <KnockoutCard match={match} key={match.id} />
        ))}
      </View>

      {/* -------------- ROUND OF 16 SECOND LINE ------------- */}
      <View style={styles.roundLine}>
        {roundOf16MatchesSecondLine.map((match) => (
          <KnockoutCard match={match} key={match.id} />
        ))}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    gap: 30,
  },
  roundLine: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  finalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    zIndex: 999,
    position: "absolute",
    right: 120,
    width: "30@s",
    height: "30@s",
  },
});
