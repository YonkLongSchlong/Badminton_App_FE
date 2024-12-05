import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { s, ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import CourseCard from "../../components/Home/CourseCard.jsx";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ColorAccent from "../../constant/Color.js";
import { getCourses } from "../../hooks/Course/getCourses.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import Color from "../../constant/Color.js";

const searchFilter = [
  { id: 1, name: "Free Course", value: "Free" },
  { id: 2, name: "Paid Course", value: "Paid" },
  { id: 3, name: "Beginner", value: "Beginner" },
  { id: 4, name: "Intermediate", value: "Intermediate" },
  { id: 5, name: "Advance", value: "Advance" },
  { id: 5, name: "All", value: "All" },
];

const filterOption = [
  { id: 1, name: "Rating" },
  { id: 2, name: "Created date" },
  { id: 3, name: "Updated date" },
  { id: 4, name: "Popularity" },
];

export default function AllCourses({ navigation }) {
  const queryClient = useQueryClient();
  const [courseType, setCourseType] = useState("Free");
  const [openFilter, setOpenFilter] = useState(false);
  const [chosenFilter, setChosenFilter] = useState("Created date");
  const [isFocus, setIsFocus] = useState(false);
  const [filteredCourse, setFilteredCourse] = useState([]);
  const token = userStore((state) => state.token);

  const courses = useQuery({
    queryKey: ["courses", token, courseType],
    queryFn: () => getCourses(token, courseType),
    enabled: !!token,
  });

  // useEffect(() => {
  //   if (courses.isSuccess) {
  //     courses.data.data.sort((a, b) => {
  //       let fnameA = String(a.id);
  //       let fnameB = String(b.id);

  //       return fnameB.localeCompare(fnameA);
  //     });
  //     setFilteredCourse(courses.data.data);
  //   }
  // }, [courses.isSuccess, chosenFilter]);

  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.headerContainer}></View>

      {/* ---------- SEARCH BAR --------- */}
      {courses.data && (
        <Dropdown
          fontFamily="Medium"
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={searchFilter}
          search
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setCourseType(item.value);
            setIsFocus(false);
            queryClient.invalidateQueries("courses");
          }}
        />
      )}

      <View style={styles.filterIconContainer}>
        <Text style={styles.header}>{courseType}</Text>
        <TouchableOpacity onPress={() => setOpenFilter(!openFilter)}>
          <MaterialIcons name="filter-list" size={s(20)} />
        </TouchableOpacity>
        {openFilter && (
          <View style={styles.filterTab}>
            {filterOption.map((option) => (
              <View key={option.id} style={styles.tab}>
                <Text style={styles.tabText}>{option.name}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* ---------- COURSES ------------ */}
      <FlatList
        contentContainerStyle={styles.courseListContainer}
        showsVerticalScrollIndicator={false}
        data={courses.data && courses.data.data}
        renderItem={({ item }) => <CourseCard key={item.id} course={item} />}
      ></FlatList>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorAccent.primary,
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginTop: 60,
  },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: "11@s",
    fontFamily: "Medium",
  },
  selectedTextStyle: {
    fontSize: "11@s",
    fontFamily: "Medium",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: "11@s",
    fontFamily: "Medium",
  },
  selectedStyle: {
    borderRadius: 12,
  },
  filterIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  header: {
    fontFamily: "Bold",
    fontSize: "14@s",
  },
  filterTab: {
    backgroundColor: Color.secondary,
    position: "absolute",
    right: 0,
    top: 40,
    padding: 15,
    zIndex: 9999,
    borderRadius: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tabText: {
    fontFamily: "Semibold",
    fontSize: "11@s",
  },
  scrollView: {
    flex: 1,
  },
  courseListContainer: {
    marginTop: 25,
    paddingBottom: 45,
    paddingHorizontal: 5,
    gap: 15,
  },
  addCourse: {
    position: "absolute",
    right: "10@s",
    bottom: "20@s",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorAccent.tertiary,
    paddingVertical: "12@s",
    paddingHorizontal: "15@s",
    borderRadius: "5@s",
  },
  addButtonText: {
    marginLeft: "8@s",
    fontSize: "16@s",
    color: ColorAccent.primary,
    fontFamily: "Bold",
  },
});
