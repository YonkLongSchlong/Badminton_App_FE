export const updateUserLessonFreeLesson = async ({ user, lesson, token }) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/user-lesson/free-lesson`,
    {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        userId: user.id,
        freeLessonId: lesson.id,
        status: 1,
      }),
    }
  );
  return await response.json();
};
