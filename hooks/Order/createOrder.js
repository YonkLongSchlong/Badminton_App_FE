export const createOrder = async ({ user, token, course }) => {
  const response = await fetch(process.env.EXPO_PUBLIC_BASE_URL + `/order`, {
    method: "POST",
    headers: {
      accept: "application/json",
      authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: user.id,
      paidCourseId: course.id,
      total: course.price,
    }),
  });
  const data = await response.json();

  return data;
};
