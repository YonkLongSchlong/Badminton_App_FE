export const getReviewByCourse = async (token, courseId) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/reviews/course/${courseId}`,
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
