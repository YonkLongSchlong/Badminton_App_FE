export default updateFreeUserCourse = async ({
  user,
  courseId,
  status,
  token,
}) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/user-course/free-course`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        status: status,
        user_id: user.id,
        free_course_id: courseId,
      }),
    }
  );
  return await response.json();
};
