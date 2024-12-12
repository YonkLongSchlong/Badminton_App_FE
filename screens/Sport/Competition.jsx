import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useEffect, useLayoutEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ScaledSheet } from "react-native-size-matters";
import ColorAccent from "../../constant/Color";
import MatchCard from "../../components/Sport/MatchCard";
import { SafeAreaView } from "react-native-safe-area-context";
import LeagueCategoryCard from "../../components/Sport/League/LeagueCategoryCard";
import { getCompetitionsSeasons } from "../../hooks/Sport/getCompetitionsSeasons";
import { getMatchesBySeason } from "../../hooks/Sport/getMatchesBySeason";
import CompetitionDetails from "../../components/Sport/League/CompetitionDetails";
import { Chase } from "react-native-animated-spinkit";
import Color from "../../constant/Color";
import Knockout from "../../components/Sport/Knockout";

const categories = [
  {
    id: 1,
    name: "Details",
  },
  {
    id: 2,
    name: "Matches",
  },
  {
    id: 3,
    name: "Knockout",
  },
];

export default function Competition({ route }) {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [sortedMatches, setSortedMatches] = useState([]);
  const [chosenCategory, setChosenCategory] = useState("Details");
  const { competition } = route.params;

  const seasons = useQuery({
    queryKey: ["seasons", competition.id],
    queryFn: () => getCompetitionsSeasons(competition.id),
  });

  const seasonsId = selectedSeason?.id;
  const matches = useQuery({
    queryKey: ["matches", seasonsId],
    queryFn: () => getMatchesBySeason(seasonsId),
    enabled: !!seasonsId,
  });

  useLayoutEffect(() => {
    if (seasons.isSuccess) {
      setSelectedSeason(seasons.data.seasons[seasons.data.seasons.length - 1]);
    }
  }, [seasons.isSuccess]);

  useEffect(() => {
    if (matches.isSuccess) {
      matches.data.summaries.sort((a, b) => {
        let fnameA = a.sport_event.id;
        let fnameB = b.sport_event.id;

        return fnameB.localeCompare(fnameA);
      });
      setSortedMatches(matches.data.summaries);
    }
  }, [matches.isSuccess]);

  if (seasons.isLoading || matches.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Chase size={50} color={Color.tertiary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView style={styles.container}>
        <StatusBar style="dark"></StatusBar>
        <View style={styles.headerContainer}>
          <View>
            <Image
              style={styles.image}
              source={require("../../assets/4043232_avatar_batman_comics_hero_icon.png")}
            />
          </View>
          <View>
            <Text style={styles.header}>{competition.name}</Text>
            <View style={styles.seasonListContainer}>
              {seasons.data && (
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && { borderColor: ColorAccent.tertiary },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={seasons.data.seasons}
                  search={false}
                  labelField="year"
                  valueField="id"
                  value={selectedSeason}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setSelectedSeason(item);
                    setIsFocus(false);
                  }}
                />
              )}
            </View>
          </View>
        </View>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <LeagueCategoryCard
              key={category.id}
              category={category}
              chosenCategory={chosenCategory}
              setChosenCategory={setChosenCategory}
            />
          ))}
        </View>
        <View style={styles.matchListContainer}>
          {chosenCategory === "Matches" ? (
            matches.data &&
            sortedMatches.map((item) => (
              <MatchCard match={item} id={item.id} key={item.id} />
            ))
          ) : chosenCategory === "Details" ? (
            selectedSeason && (
              <CompetitionDetails
                competition={competition}
                season={selectedSeason}
              />
            )
          ) : chosenCategory === "Knockout" ? (
            <Knockout matches={sortedMatches} />
          ) : (
            <News></News>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 20,
    paddingHorizontal: 35,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
  },
  header: {
    fontFamily: "Bold",
    fontSize: "11@s",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  seasonListContainer: {
    marginBottom: 15,
  },
  dropdown: {
    height: 50,
    width: 100,
    borderColor: "gray",
    borderRadius: 5,
  },
  placeholderStyle: {
    fontFamily: "Medium",
    fontSize: 16,
  },
  selectedTextStyle: {
    fontFamily: "Medium",
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
});
