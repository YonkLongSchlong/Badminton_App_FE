import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, ScaledSheet } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import createUserLessonFreeLesson from "../../hooks/UserLesson/createUserLessonFreeLesson";
import { errorToast } from "../../utils/toastConfig";

export default FreeLessonCard = (props) => {
  const navigation = useNavigation();
  const user = userStore((state) => state.user);
  const token = userStore((state) => state.token);
  console.log(props.freeCourse);

  const userLesson = props.freeCourse.result.userLesson;
  console.log(userLesson);

  const enrollLessonMutation = useMutation({
    mutationFn: createUserLessonFreeLesson,
    onSuccess: (data) => {
      navigation.navigate("WatchLesson", {
        lesson: props.lesson,
        userLesson: userLesson,
      });
    },
  });

  const handleNavigation = () => {
    if (props.freeCourse.started == false || props.freeCourse.started == null) {
      errorToast("You will need to start the course to continue");
      return;
    }
    console.log(props.lesson);

    if (userLesson != null) {
      navigation.navigate("WatchLesson", {
        lesson: props.lesson,
        userLesson: userLesson,
      });
    } else {
      const lessonId = props.lesson.id;
      enrollLessonMutation.mutate({ user, lessonId, token });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstPart}>
        <TouchableOpacity>
          <Ionicons
            name="play-circle"
            color={ColorAccent.light_tertiary}
            size={scale(46)}
            onPress={handleNavigation}
          />
        </TouchableOpacity>

        <View style={styles.lessonInfoContainer}>
          <Text style={styles.subHeading} numberOfLines={1}>
            {props.lesson.name}
          </Text>
          {/* <Text style={styles.subText}>{props.lesson.length}</Text> */}
        </View>
      </View>

      <TouchableOpacity style={styles.secondPart}>
        {userLesson.length > 0 &&
        userLesson.some(
          (obj) => obj.freeLessonId == props.lesson.id && obj.status == 1
        ) ? (
          <MaterialIcons name="done" size={scale(14)} color="black" />
        ) : (
          <MaterialIcons name="chevron-right" size={scale(14)} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  firstPart: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  lessonInfoContainer: {
    width: "65%",
  },
  secondPart: {
    backgroundColor: ColorAccent.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    padding: 6,
  },
  heading: {
    fontFamily: "Bold",
    fontSize: "14@s",
  },
  subHeading: {
    fontFamily: "Bold",
    fontSize: "11@s",
  },
  text: {
    fontFamily: "Regular",
    fontSize: "11@s",
  },
  subText: {
    fontFamily: "Regular",
    fontSize: "9@s",
  },
  iconUpdate: {
    backgroundColor: ColorAccent.bgUpdateButton,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    padding: 6,
    marginRight: 6,
  },
  iconDelete: {
    backgroundColor: ColorAccent.bgCancelButton,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    padding: 6,
    marginRight: 6,
  },
});
