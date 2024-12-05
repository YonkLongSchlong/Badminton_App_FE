import UnauthorizeError from "../../utils/fetchError";

export const getCourses = async (token, chosenCategory) => {
  let url = null;
  switch (chosenCategory) {
    case "Free":
      url = "/free-courses";
      break;
    case "Paid":
      url = "/paid-courses";
      break;
    default:
      url = null;
  }
  const response = await fetch(process.env.EXPO_PUBLIC_BASE_URL + url, {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: "Bearer " + token,
    },
  });

  if (response.status === 401) {
    throw new UnauthorizeError();
  } else {
    const data = await response.json();
    return data;
  }
};
