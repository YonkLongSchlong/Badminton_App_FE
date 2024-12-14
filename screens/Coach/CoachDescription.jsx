import { ScaledSheet } from "react-native-size-matters";
import Color from "../../constant/Color";
import { Image, ScrollView, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getCoachById } from "../../hooks/Coach/getCoachById";
import CourseCard from "../../components/Home/CourseCard";
import { Chase } from "react-native-animated-spinkit";

export default CoachDescription = (props) => {
  const coachId = props.route.params.coachId;
  const token = userStore((state) => state.token);

  const coach = useQuery({
    queryKey: ["coach", token, coachId],
    queryFn: () => getCoachById(token, coachId),
    enabled: !!token,
  });

  if (coach.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Chase size={50} color={Color.tertiary} />
      </View>
    );
  }

  if (coach.isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.coachImageNameContainer}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={
                coach.data.data.avatar == null
                  ? require("../../assets/4043232_avatar_batman_comics_hero_icon.png")
                  : { uri: coach.data.data.avatar }
              }
            />
          </View>
          <Text style={styles.coachNameText}>
            {coach.data.data.firstName + " " + coach.data.data.lastName}
          </Text>
        </View>
        <View style={styles.coachDescriptionContainer}>
          <Text style={styles.coachDescriptionText}>
            {coach.data.data.description}
          </Text>
        </View>
        <View style={styles.popularCourseHeaderContainer}>
          <Text style={styles.popularCourseHeader}>Popular courses</Text>
        </View>
        <View style={styles.popularCourse}>
          {coach.data.data.paidCourse.map((course) => (
            <CourseCard key={course.id} course={course} />
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
  coachImageNameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  avatarContainer: {
    borderRadius: 164,
    borderWidth: 3,
    width: "60@s",
    height: "60@s",
    borderColor: ColorAccent.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "50@s",
    height: "50@s",
    borderRadius: 150,
    resizeMode: "cover",
  },
  coachNameText: {
    fontFamily: "Bold",
    fontSize: "14@s",
    marginTop: 10,
  },
  coachDescriptionContainer: {
    marginTop: 20,
  },
  coachDescriptionText: {
    fontFamily: "Medium",
    fontSize: "11@s",
    lineHeight: 20,
  },
  popularCourse: {
    gap: 20,
  },
  popularCourseHeaderContainer: {
    marginVertical: 15,
    marginTop: 20,
  },
  popularCourseHeader: {
    fontFamily: "Bold",
    fontSize: "12@s",
    lineHeight: 25,
  },
});
