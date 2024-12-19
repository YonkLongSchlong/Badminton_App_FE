import React from "react";
import { ScrollView, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Color from "../../constant/Color";

export const FinishedCourse = (props) => {
  const courses = props.route.params.courses;
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.popularCourse}>
          {courses.map((course) => (
            <OverviewCourseCard key={course.id} course={course} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  popularCourse: {
    gap: 20,
  },
});
