export const getFreeCourseById = async (token, id) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/free-courses/${id}`,
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
