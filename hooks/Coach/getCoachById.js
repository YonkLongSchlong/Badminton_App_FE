export const getCoachById = async (token, coachId) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/users/coach/${coachId}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: "Bearer " + token,
      },
    }
  );

  const data = await response.json();
  console.log(data.data.paidCourse);

  return data;
};
