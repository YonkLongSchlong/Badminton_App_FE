export const getPaidCourseById = async (token, id) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/paid-courses/${id}/user`,
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
