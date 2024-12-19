export default startFreeUserCourse = async ({ user, courseId, token }) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/user-course`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        status: 1,
        user_id: user.id,
        free_course_id: courseId,
      }),
    }
  );
  return await response.json();
};
