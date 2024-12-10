export default createUserLessonFreeLesson = async ({
  user,
  lessonId,
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
        status: 0,
      }),
    }
  );
  return await response.json();
};
