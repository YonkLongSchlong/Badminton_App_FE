export const getLeagueImage = async (imageHash) => {
  const response = await fetch(
    `https://images.sportdevs.com/${imageHash}.png`,
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
