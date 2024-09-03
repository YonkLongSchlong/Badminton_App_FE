import {Text, View, Pressable } from "react-native";
import React from "react";
import { Agenda } from "react-native-calendars";
import { ScaledSheet } from "react-native-size-matters";

const schedules = {
  "2024-09-01": [
    {
      id: 1,
      name: "Getting started with badminton",
      time: "6h30 - 8h30",
      instructor: "Nguyen Van A",
      court: "1A",
      height: 120,
      day: "2024-09-01",
    },
  ],
  "2024-09-02": [
    {
      id: 2,
      name: "Advance",
      time: "9h - 11h",
      instructor: "Nguyen Van A",
      court: "1A",
      height: 120,
      day: "2024-09-02",
    },
    {
      id: 3,
      name: "Getting started with badminton",
      time: "6h30 - 8h30",
      instructor: "Nguyen Van A",
      court: "1A",
      height: 120,
      day: "2024-09-02",
    },
  ],
  "2024-09-03": [],
  "2024-09-04": [
    {
      id: 4,
      name: "Getting started with badminton",
      time: "6h30 - 8h30",
      instructor: "Nguyen Van A",
      court: "1A",
      height: 120,
      day: "2024-09-04",
    },
    {
      id: 5,
      name: "Advance",
      time: "9h - 11h",
      instructor: "Nguyen Van A",
      court: "1A",
      height: 120,
      day: "2024-09-04",
    },
  ],
};

const Schedule = () => {
  const renderItem = (reservation) => {
    return (
      <Pressable style={[styles.item, { height: reservation.height }]}>
        <Text style={styles.itemName}>{reservation.name}</Text>
        <View style={styles.itemWrapper}>
          <Text style={styles.label}>Time :</Text>
          <Text style={styles.itemValue}>{reservation.time}</Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.label}>Instructor :</Text>
          <Text style={styles.itemValue}>{reservation.instructor}</Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.label}>Court :</Text>
          <Text style={styles.itemValue}>{reservation.court}</Text>
        </View>
      </Pressable>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is an empty date!</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={schedules}
        selected="2024-09-01"
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        showOnlySelectedDayItems
      />
    </View>
  );
};

export default Schedule;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  itemWrapper: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 2,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "500",
  },
  label: {
    fontSize: 14,
    color: "rgba(0,0,0,0.7)",
    width: 100,
  },
  itemValue: {
    fontSize: 15,
    fontWeight: "500",
  },
});
