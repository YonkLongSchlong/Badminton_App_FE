import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Color from "../../constant/Color";

export const BadmintonRules = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView></SafeAreaView>
        <StatusBar style="dark" />
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Badminton Rules</Text>
        </View>

        <View style={styles.ruleContainer}>
          <View style={{ flexDirection: "column", gap: 5, marginBottom: 10 }}>
            <Text style={styles.sectionHeading}>1. Toss</Text>
            <Text style={styles.ruleText}>
              The rules of badminton states that a toss shall be conducted
              before a game starts. If you win, you can choose between serving
              first or to start play at either end of the court. Your opponent
              can then exercise the remaining choice.
            </Text>
          </View>
          <View style={{ flexDirection: "column", gap: 5, marginBottom: 10 }}>
            <Text style={styles.sectionHeading}>2. Scoring system</Text>
            <Text style={styles.ruleText}>
              The rules of badminton states that a badminton match shall consist
              of the best of 3 games. In doubles and men's singles, the first
              side to score 15 points wins the game. In women's singles, the
              first side to score 11 points wins the game.
            </Text>
            <Text style={styles.ruleText}>
              If the score becomes 14-all, the side which first scored 14 shall
              exercise the choice to continue the game to 15 points or to 'set'
              the game to 17 points.
            </Text>
          </View>
          <View style={{ flexDirection: "column", gap: 5, marginBottom: 10 }}>
            <Text style={styles.sectionHeading}>3. Change of ends</Text>
            <Text style={styles.ruleText}>
              The rules of badminton states that you have to change ends with
              your opponent after finishing the first game. If a third game was
              to be played, you shall change ends when the leading score reaches
              6 in a game of 11 points or 8 in a game of 15 points.
            </Text>
            <Text style={styles.ruleText}>
              If the score becomes 14-all, the side which first scored 14 shall
              exercise the choice to continue the game to 15 points or to 'set'
              the game to 17 points.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 5,
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            <Text style={styles.heading}>Rules of Badminton - Singles</Text>
            <Text style={styles.sectionHeading}>
              1. Serving and receiving courts
            </Text>
            <Text style={styles.ruleText}>
              You shall serve from, and receive in, the right service court when
              you or your opponent has scored an even number of points in that
              game.
            </Text>
            <Text style={styles.ruleText}>
              You shall serve from, and receive in, the left service court when
              you or your opponent has scored an odd number of points in that
              game.
            </Text>
            <Text style={styles.ruleText}>
              You and your opponent will hit the shuttle alternately until a
              'fault' is made or the shuttle ceases to be in play.
            </Text>
          </View>
          <View style={{ flexDirection: "column", gap: 5, marginBottom: 10 }}>
            <Text style={styles.sectionHeading}>2. Scoring and serving</Text>
            <Text style={styles.ruleText}>
              You score a point and serve again from the alternate service court
              when your opponent makes a 'fault' or the shuttle ceases to be in
              play because it touches the surface of your opponent's side of
              court.
            </Text>
            <Text style={styles.ruleText}>
              No points will be scored when you make a 'fault' or the shuttles
              ceases to be in play because it touches the surface of your side
              of court. The serving right will then be transferred to your
              opponent.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 5,
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            <Text style={styles.heading}>Rules of Badminton - Doubles</Text>
            <Text style={styles.sectionHeading}>
              1. Order of play and position on court
            </Text>
            <Text style={styles.ruleText}>
              After the service is returned, either you or your partner may hit
              the shuttle from any position on your side of the net. Then either
              player from the opposing side may do the same, and so on, until
              the shuttle ceases to be in play.
            </Text>
            <Text style={styles.ruleText}>
              You shall serve from, and receive in, the left service court when
              you or your opponent has scored an odd number of points in that
              game.
            </Text>
            <Text style={styles.ruleText}>
              You and your opponent will hit the shuttle alternately until a
              'fault' is made or the shuttle ceases to be in play.
            </Text>
          </View>
          <View style={{ flexDirection: "column", gap: 5, marginBottom: 10 }}>
            <Text style={styles.sectionHeading}>2. Scoring and serving</Text>
            <Text style={styles.ruleText}>
              If you are serving or receiving first at the start of any game,
              you shall serve or receive in the right service court when your
              side or your opponent's side scored an even number of points.
            </Text>
            <Text style={styles.ruleText}>
              You shall serve from or receive in the left service court when
              your side or your opponent's side has scored an odd number of
              points.
            </Text>
            <Text style={styles.ruleText}>
              The reverse pattern shall apply to your partner.
            </Text>
            <Text style={styles.ruleText}>
              In any game, the right to serve passes consecutively from the
              initial server to the initial receiver, then to that initial's
              receiver's partner, then to the opponent who is due to serve from
              the right service court, then to that player's partner, and so on.
            </Text>
            <Text style={styles.ruleText}>
              You shall not serve out of turn, receive out of turn, or receive
              two consecutive services in the same game, except as provided in
              service court errors and 'lets'.
            </Text>
          </View>
          <View style={{ flexDirection: "column", gap: 5, marginBottom: 10 }}>
            <Text style={styles.sectionHeading}>3. Service court errors</Text>
            <Text style={styles.ruleText}>
              A service court error has been made when a player has served out
              of turn, has served from the wrong service or standing on the
              wrong service court while being prepared to receive the service
              and it has been delivered.
            </Text>
            <Text style={styles.ruleText}>
              If a service court error is discovered after the next service had
              been delivered, the error shall not be corrected. If a service
              court error is discovered before the next service is delivered,
              the following rules apply.
            </Text>
            <Text style={styles.ruleText}>
              If both sides committed an error, it shall be a 'let'. If one side
              committed the error and won the rally, it shall be a 'let'. If one
              side committed the error and lost the rally, the error shall not
              be corrected.
            </Text>
            <Text style={styles.ruleText}>
              If there is a 'let' because of a service court error, the rally is
              replayed with the error corrected. If a service court error is not
              to be corrected, play in that game shall proceed without changing
              the player's new service courts.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 5,
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            <Text style={styles.heading}>Faults</Text>
            <Text style={styles.ruleText}>
              1. If the shuttle lands outside the boundaries of the court,
              passes through or under the net, fail to pass the net, touches the
              ceiling or side walls, touches the person or dress of a player or
              touches any other object or person.
            </Text>
            <Text style={styles.ruleText}>
              2. If the initial point of contact with the shuttle is not on the
              striker's side of the net. (The striker may, however, follow the
              shuttle over the net with the racket in the course of a stroke.)
            </Text>
            <Text style={styles.ruleText}>
              3. If a player touches the net or its supports with racket, person
              or dress, invades an opponent's court over the net with racket or
              person except as permitted.
            </Text>
            <Text style={styles.ruleText}>
              4. If a player invades an opponent's court under the net with
              racket or person such that an opponent is obstructed or distracted
              or obstructs an opponent, that is prevents an opponent from making
              a legal stroke where the shuttle is followed over the net.
            </Text>
            <Text style={styles.ruleText}>
              5. If a player deliberately distracts an opponent by any action
              such as shouting or making gestures.
            </Text>
            <Text style={styles.ruleText}>
              6. If the shuttle is caught and held on the racket and then slung
              during the execution of a stroke.
            </Text>
            <Text style={styles.ruleText}>
              7. If the shuttle is hit twice in succession by the same player
              with two strokes.
            </Text>
            <Text style={styles.ruleText}>
              8. If the shuttle is hit by a player and the player's partner
              successively or touches a player's racket and continues towards
              the back of that player's court.
            </Text>
            <Text style={styles.ruleText}>
              9. If a player is guilty of flagrant, repeated or persistent
              offences under Law of Continuous Play, Misconduct, Penalties.
            </Text>
            <Text style={styles.ruleText}>
              10. If, on service, the shuttle is caught on the net and remains
              suspended on top, or, on service, after passing over the net is
              caught in the net.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 35,
    paddingBottom: 60,
    paddingTop: 30,
    backgroundColor: Color.primary,
  },
  headerContainer: {
    marginTop: 60,
  },
  heading: {
    fontFamily: "Bold",
    fontSize: "16@s",
    textAlign: "center",
    marginBottom: 20,
  },
  ruleContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  sectionHeading: {
    fontFamily: "Semibold",
    fontSize: "14@s",
    marginBottom: 5,
  },
  ruleText: {
    fontFamily: "Medium",
    fontSize: "12@s",
  },
});
