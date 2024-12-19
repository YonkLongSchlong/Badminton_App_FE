import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { s, ScaledSheet } from "react-native-size-matters";
import { ResizeMode, Video } from "expo-av";
import ColorAccent from "../../constant/Color.js";
import { createEditorJsViewer } from "editorjs-viewer-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import userStore from "../../store/userStore.js";
import { getQuestionByPaidLesson } from "../../hooks/Question/getQuestions.js";
import { getUserLesson } from "../../hooks/UserLesson/getUserLesson.js";
import { errorToast } from "../../utils/toastConfig.js";
import { getPaidLessonById } from "../../hooks/Lesson/getPaidLessonById.js";
import createUserLessonPaidLesson from "../../hooks/UserLesson/createUserLessonPaidLesson.js";

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

const VideoComponent = ({ block }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  data = block.data; // Check if data is passed correctly

  return (
    <View style={{ marginTop: 20, marginBottom: 20, gap: 10 }}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: data.file.url,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={(status) => setStatus(status)}
      />
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
  customTools: {
    video: {
      Component: VideoComponent,
    },
  },
});

export default function PaidLesson(props) {
  const navigation = useNavigation();
  const token = userStore((state) => state.token);
  const user = userStore((state) => state.user);

  const { lesson, userLesson } = props.route.params;

  const lessonId = lesson.id;
  const paidLesson = useQuery({
    queryKey: ["paidLesson", token, lessonId],
    queryFn: () => getPaidLessonById(token, lessonId),
    enabled: !!token,
  });

  const paidLessonQuestions = useQuery({
    queryKey: ["paidLessonQuestions", token, lessonId],
    queryFn: () => getQuestionByPaidLesson(token, lessonId),
    enabled: !!token,
  });

  const userLessonMutation = useMutation({
    mutationFn: createUserLessonPaidLesson,
    onSuccess: () => {
      navigation.navigate("Quiz", {
        questions: paidLessonQuestions.data,
        lesson: lesson,
      });
    },
  });

  const handleNavigateToQuiz = () => {
    const courseId = lesson.paidCourseId;
    userLessonMutation.mutate({ user, lessonId, courseId, token });
  };

  const renderEditorJsContent = () => (
    <>
      {paidLesson.data && (
        <EditorJsViewerNative data={paidLesson.data.content} />
      )}

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (paidLessonQuestions.data.length === 0) {
              errorToast("No quiz available for this lesson");
            } else {
              handleNavigateToQuiz();
            }
          }}
        >
          {userLesson.some(
            (obj) => obj.paidLessonId == lesson.id && obj.status == 1
          ) ? (
            <Text style={styles.btnText}>Revision</Text>
          ) : (
            <Text style={styles.btnText}>Quiz</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <FlatList
      data={[{}]}
      renderItem={renderEditorJsContent}
      keyExtractor={(item, index) => index.toString()}
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
    marginBottom: 10,
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
  video: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});
