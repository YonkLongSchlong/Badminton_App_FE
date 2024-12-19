export const getOngoingCourse = async (token, user) => {
  const userId = user.id;
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/user-course/ogoing/${userId}`,
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
