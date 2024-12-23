export const getFreeCourseById = async (token, id) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/free-courses/${id}/user`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: "Bearer " + token,
      },
    }
  );

  const data = await response.json();
  console.log(data);

  return data;
};
