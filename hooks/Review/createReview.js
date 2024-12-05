export const createReview = async ({
  user,
  token,
  course,
  reviewText,
  starRating,
}) => {
  const response = await fetch(process.env.EXPO_PUBLIC_BASE_URL + `/reviews`, {
    method: "POST",
    headers: {
      accept: "application/json",
      authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: user.id,
      paidCourseId: course.id,
      comment: reviewText,
      rating: starRating,
    }),
  });
  const data = await response.json();
  return data;
};
