export const getCoaches = async (token) => {
  const response = await fetch(process.env.EXPO_PUBLIC_BASE_URL + `/coaches`, {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: "Bearer " + token,
    },
  });

  const data = await response.json();

  return data;
};
