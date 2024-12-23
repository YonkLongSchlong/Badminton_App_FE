export const getPaidLessonById = async (token, lessonId) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/paid-lessons/${lessonId}/user`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: "Bearer " + token,
      },
    }
  );

  const data = await response.json();

  return data;
};
