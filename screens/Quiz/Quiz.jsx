import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { s, ScaledSheet } from "react-native-size-matters";
import Color from "../../constant/Color";
import { errorToast } from "../../utils/toastConfig";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserLessonFreeLesson } from "../../hooks/UserLesson/updateUserLessonFreeLesson";
import { updateUserLessonPaidLesson } from "../../hooks/UserLesson/updateUserLessonPaidLesson";
import userStore from "../../store/userStore";
import { Chase } from "react-native-animated-spinkit";
import { useNavigation } from "@react-navigation/native";

export default Quiz = ({ route }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const questions = route.params.questions;
  const lesson = route.params.lesson;
  const passScore = questions.length - 1;
  const user = userStore((state) => state.user);
  const token = userStore((state) => state.token);
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const currentQuestion = questions[currentQuestionIndex];

  const handleNavigation = () => {
    navigation.pop(2);
  };

  const handleAnswer = (option) => {
    setSelectedAnswer(option.text);
    if (option.text == currentQuestion.rightAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer == "") {
      errorToast("Please select an answer");
      return;
    }
    setSelectedAnswer("");
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  const updateUserLessonFreeLessonMutation = useMutation({
    mutationFn: updateUserLessonFreeLesson,
    onSuccess: () => {
      setIsCompleted(true);
      queryClient.invalidateQueries("freeCourse");
    },
  });

  const updateUserLessonPaidLessonMutation = useMutation({
    mutationFn: updateUserLessonPaidLesson,
    onSuccess: () => {
      setIsCompleted(true);
      queryClient.invalidateQueries("paidCourse");
    },
  });

  useEffect(() => {
    if (currentQuestionIndex >= questions.length && score >= passScore) {
      if (lesson.freeCourseId !== undefined) {
        updateUserLessonFreeLessonMutation.mutate({ user, lesson, token });
        setCurrentQuestionIndex(0);
      } else {
        updateUserLessonPaidLessonMutation.mutate({ user, lesson, token });
        setCurrentQuestionIndex(0);
      }
    }
  }, [currentQuestionIndex, score]);

  if (isCompleted) {
    return (
      <View style={styles.finishedContainer}>
        <Text style={styles.finishedTitle}>
          Congratulation, you have passed{" "}
          <MaterialCommunityIcons
            name="robot-happy-outline"
            size={s(20)}
            color="black"
          />
        </Text>
        <Text style={styles.score}>
          Your score: {score}/{questions.length}
        </Text>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNavigation}>
          <Text style={styles.btnText}>NEXT LESSON</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (currentQuestionIndex >= questions.length && score < passScore) {
    return (
      <View style={styles.finishedContainer}>
        <Text style={styles.finishedTitle}>
          Don't worry let's try again{"  "}
          <FontAwesome name="hand-rock-o" size={s(18)} color="black" />
        </Text>
        <Text style={styles.score}>
          Your score: {score}/{questions.length}
        </Text>
        <TouchableOpacity style={styles.nextBtn} onPress={restartQuiz}>
          <Text style={styles.btnText}>RESTART QUIZ</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Chase size={50} color={Color.tertiary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentQuestion.text}</Text>
      {currentQuestion.answer.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.answer,
            selectedAnswer === option.text && styles.selectedAnswer,
          ]}
          onPress={() => handleAnswer(option)}
        >
          <Text
            style={[
              styles.answerText,
              selectedAnswer === option.text && styles.selectedAnswerText,
            ]}
          >
            {option.text}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNextQuestion}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: Color.primary,
  },
  finishedContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: Color.primary,
    gap: 20,
    paddingBottom: 50,
  },
  title: {
    fontFamily: "Bold",
    fontSize: "14@s",
    textAlign: "center",
    marginBottom: 50,
  },
  finishedTitle: {
    fontFamily: "Bold",
    fontSize: "14@s",
    textAlign: "center",
  },
  answer: {
    width: "100%",
    padding: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedAnswer: {
    backgroundColor: Color.light_tertiary,
  },
  selectedAnswerText: {
    color: Color.primary,
    fontFamily: "Medium",
  },
  answerText: {
    fontFamily: "Medium",
    fontSize: "12@s",
  },
  score: {
    fontSize: "14@s",
    textAlign: "center",
  },
  btnContainer: {
    paddingVertical: 15,
  },
  nextBtn: {
    backgroundColor: ColorAccent.tertiary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  btnText: {
    fontFamily: "Bold",
    fontSize: "12@s",
    color: ColorAccent.primary,
  },
});
