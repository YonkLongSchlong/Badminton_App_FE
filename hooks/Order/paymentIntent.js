export const paymentIntent = async ({ user, token, course, orderId }) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/order/intent`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        coursePrice: Number.parseFloat(course.price),
        courseName: course.name,
        total: Number.parseFloat(course.price),
        orderId: Number.parseInt(orderId),
      }),
    }
  );
  const data = await response.json();
  return data;
};
