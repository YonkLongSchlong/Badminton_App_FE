import React from "react";
import { Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default Stars = ({ course }) => {
  const fullStars = Math.floor(course.star);
  const hasHalfStar = course.star % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.ratingWrapper}>
      <View style={styles.starWrapper}>
        <Text style={styles.heading}>{course.star}</Text>
        <View style={styles.stars}>
          {Array(fullStars)
            .fill()
            .map((_, index) => (
              <MaterialIcons
                key={`full-${index}`}
                name="star"
                size={18}
                color="#FFD700"
              />
            ))}
          {hasHalfStar && (
            <MaterialIcons name="star-half" size={18} color="#FFD700" />
          )}
          {Array(emptyStars)
            .fill()
            .map((_, index) => (
              <MaterialIcons
                key={`empty-${index}`}
                name="star-outline"
                size={18}
                color="#FFD700"
              />
            ))}
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  ratingWrapper: {
    flexDirection: "row",
    gap: 15,
    marginTop: 15,
  },
  starWrapper: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  heading: {
    fontFamily: "Bold",
    fontSize: "13@s",
  },
  stars: {
    flexDirection: "row",
  },
});
