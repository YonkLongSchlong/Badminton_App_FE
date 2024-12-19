export default startPaidUserCourse = async ({ user, courseId, token }) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/user-course/paid-course`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        status: 1,
        user_id: user.id,
        paid_course_id: courseId,
      }),
    }
  );
  return await response.json();
};
