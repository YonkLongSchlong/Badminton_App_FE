export const getSeasonsByLeague = async (league_id) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_TEST_API_BASE_URL +
      `/seasons?league_id=${league_id}`,
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
