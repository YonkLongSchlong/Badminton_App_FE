export const getTournaments = async () => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_TEST_API_BASE_URL + "/tournaments",
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
