export const deleteReview = async ({ user, token, reviewId, courseId }) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/reviews/${reviewId}`,
    {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userId: user.id,
        courseId: courseId,
      }),
    }
  );

  const data = await response.json();
  return data;
};
