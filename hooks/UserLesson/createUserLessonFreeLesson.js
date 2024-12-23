export default createUserLessonFreeLesson = async ({
  user,
  lessonId,
  courseId,
  token,
}) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/user-lesson/free-lesson`,
    {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userId: user.id,
        freeLessonId: lessonId,
        freeCourseId: courseId,
        courseType: 0,
        status: 0,
      }),
    }
  );
  return await response.json();
};
