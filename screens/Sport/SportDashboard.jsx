import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { FlatList, ScrollView, Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { getClasses } from "../../hooks/Sport/getClasses";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { getCompetitions } from "../../hooks/Sport/getCompetitions";
import CompetitionCard from "../../components/Sport/League/CompetitionsCard";
import { Chase } from "react-native-animated-spinkit";
import Color from "../../constant/Color";

export default function SportDashboard() {
  const [isFocus, setIsFocus] = useState(false);

  const competitions = useQuery({
    queryKey: ["competitions"],
    queryFn: getCompetitions,
  });

  if (competitions.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Chase size={50} color={Color.tertiary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <StatusBar style="dark"></StatusBar>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Competitions</Text>
      </View>
      {/* {classes.data && (
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={classes.data}
          search
          maxHeight={300}
          labelField="name"
          valueField="flag"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={selectedCountry}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setSelectedCountry(item);
            setIsFocus(false);
          }}
        />
      )} */}
      <View style={styles.listContainer}>
        {competitions.data && (
          <FlatList
            data={competitions.data.competitions}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <CompetitionCard competition={item} />}
          />
        )}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 35,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 60,
  },
  header: {
    fontFamily: "Bold",
    fontSize: "14@s",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  placeholderStyle: {
    fontFamily: "Medium",
    fontSize: 16,
  },
  selectedTextStyle: {
    fontFamily: "Medium",
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    paddingHorizontal: 10,
    fontFamily: "Medium",
    height: 50,
    fontSize: 16,
    borderRadius: 8,
  },
  listContainer: {
    marginTop: 20,
    marginBottom: 60,
  },
});
