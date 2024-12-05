export const getLeagues = async (class_id) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_TEST_API_BASE_URL +
      `/leagues?class_id=${class_id}&_sort=start_league:ASC`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
};
