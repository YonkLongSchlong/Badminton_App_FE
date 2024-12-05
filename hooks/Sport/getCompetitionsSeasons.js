export const getCompetitionsSeasons = async (competitionId) => {
  const encodedId = encodeURIComponent(competitionId);
  const response = await fetch(
    process.env.EXPO_PUBLIC_SPORT_RADAR_BASE_URL +
      `/competitions/${encodedId}/seasons.json?api_key=${process.env.EXPO_PUBLIC_SPORT_RADAR_API_KEY}`,
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
