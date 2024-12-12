export const updateReview = async ({
  user,
  token,
  courseId,
  reviewId,
  reviewText,
  starRating,
}) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/reviews/${reviewId}`,
    {
      method: "PATCH",
      headers: {
        accept: "application/json",
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        comment: reviewText,
        rating: starRating,
        paidCourseId: courseId,
      }),
    }
  );
  const data = await response.json();
  return data;
};
