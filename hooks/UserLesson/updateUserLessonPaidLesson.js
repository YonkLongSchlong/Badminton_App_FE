export const updateUserLessonPaidLesson = async ({ user, lesson, token }) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/user-lesson/paid-lesson`,
    {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        userId: user.id,
        paidLessonId: lesson.id,
        status: 1,
      }),
    }
  );
  return await response.json();
};
