export default createUserLessonPaidLesson = async ({
  user,
  lessonId,
  courseId,
  token,
}) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/user-lesson/paid-lesson`,
    {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userId: user.id,
        paidLessonId: lessonId,
        paidCourseId: courseId,
        courseType: 1,
        status: 0,
      }),
    }
  );
  return await response.json();
};
