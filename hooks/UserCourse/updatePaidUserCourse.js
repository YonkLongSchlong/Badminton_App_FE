export default updatePaidUserCourse = async ({
  user,
  courseId,
  status,
  token,
}) => {
  console.log(courseId);

  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/user-course/paid-course`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        status: status,
        user_id: user.id,
        paid_course_id: courseId,
      }),
    }
  );
  return await response.json();
};
