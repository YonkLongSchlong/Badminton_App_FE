export const getTournaments = async () => {
  const response = await fetch(TEST_API_BASE_URL + "tournaments", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  const data = await response.json();
  return data;
};
