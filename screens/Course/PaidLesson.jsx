import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { s, ScaledSheet } from "react-native-size-matters";
import { Video } from "expo-av";
import ColorAccent from "../../constant/Color.js";
import { createEditorJsViewer } from "editorjs-viewer-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import userStore from "../../store/userStore.js";
import { getFreeLessonById } from "../../hooks/Lesson/getFreeLessonsById.js";
import { getQuestionsByFreeLesson } from "../../hooks/Question/getQuestions.js";
import { getUserLesson } from "../../hooks/UserLesson/getUserLesson.js";
import { errorToast } from "../../utils/toastConfig.js";

const MyHeader = ({ data }) => {
  if (data && data.text.includes("&nbsp;")) {
    return (
      <Text style={styles.header}>
        {data && data.text.replace(/&nbsp;?/g, " ")}
      </Text>
    );
  }
  return <Text style={styles.header}>{data && data.text}</Text>;
};

const MyParagraph = ({ data }) => {
  if (data && data.text.includes("<b>")) {
    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.subHeader}>
          {data.text.replace(/&nbsp;?|<b>|<\/b>/g, " ")}
        </Text>
      </View>
    );
  } else if (data && data.text.includes("<i>")) {
    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.italicHeader}>
          {data.text.replace(/&nbsp;?|<i>|<\/i>/g, " ")}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 10, gap: 10 }}>
      <Text style={styles.paragraph}>{data.text}</Text>
    </View>
  );
};

const MyList = ({ data }) => {
  return (
    <View style={{ marginBottom: 10, gap: 10 }}>
      {data &&
        data.items.map((item, index) => (
          <Text key={index} style={styles.listParagraph}>
            {data.style === "ordered" ? `${index + 1}. ` : "-  "}
            {item}
          </Text>
        ))}
    </View>
  );
};

const EditorJsViewerNative = createEditorJsViewer({
  tools: {
    header: {
      Component: MyHeader,
    },
    paragraph: {
      Component: MyParagraph,
    },
    list: {
      Component: MyList,
    },
  },
});

export default function PaidLesson(props) {
  const navigation = useNavigation();
  const token = userStore((state) => state.token);
  const user = userStore((state) => state.user);
  const { lesson } = props.route.params;

  const lessonId = lesson.id;
  const freeLesson = useQuery({
    queryKey: ["freeLesson", token, lessonId],
    queryFn: () => getFreeLessonById(token, lessonId),
    enabled: !!token,
  });

  const freeLessonQuestions = useQuery({
    queryKey: ["freeLessonQuestions", token, lessonId],
    queryFn: () => getQuestionsByFreeLesson(token, lessonId),
    enabled: !!token,
  });

  const userLesson = useQuery({
    queryKey: ["userLesson", token, lessonId],
    queryFn: () => getUserLesson(token, user, lessonId),
    enabled: !!token,
  });

  const renderEditorJsContent = () => (
    <>
      {freeLesson.data && (
        <EditorJsViewerNative data={freeLesson.data.content} />
      )}

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (freeLessonQuestions.data.length === 0) {
              errorToast("No quiz available for this lesson");
            } else {
              navigation.navigate("Quiz", {
                questions: freeLessonQuestions.data,
                lesson: lesson,
              });
            }
          }}
        >
          {userLesson.isSuccess && userLesson.data == null ? (
            <Text style={styles.btnText}>Quiz</Text>
          ) : (
            <Text style={styles.btnText}>Revision</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <FlatList
      data={[{}]} // Dummy data to satisfy FlatList requirements
      renderItem={renderEditorJsContent}
      keyExtractor={(item, index) => index.toString()} // Unique key for each item
      contentContainerStyle={styles.container}
    />
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: ColorAccent.primary,
  },
  editorJSText: {
    fontFamily: "Bold",
    fontSize: "20@s",
  },
  header: {
    fontSize: s(22),
    fontFamily: "Bold",
  },
  subHeader: {
    fontSize: s(13),
    fontFamily: "Bold",
    lineHeight: 22,
  },
  italicHeader: {
    fontSize: s(13),
    fontFamily: "Bold",
    lineHeight: 22,
    fontStyle: "italic",
  },
  paragraph: {
    fontSize: s(12),
    fontFamily: "Medium",
    lineHeight: 22,
  },
  listParagraph: {
    marginLeft: 20,
    fontSize: s(12),
    fontFamily: "Medium",
    lineHeight: 22,
  },
  btnContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  btn: {
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
