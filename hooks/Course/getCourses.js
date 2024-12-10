import UnauthorizeError from "../../utils/fetchError";

export const getCourses = async (token, chosenCategory) => {
  let url = "";
  let paidUrl = "";
  let freeUrl = "";
  switch (chosenCategory) {
    case "Free":
      url = "/free-courses";
      return await getFreeOrPaidCourse(token, url);
    case "Paid":
      url = "/paid-courses";
      return await getFreeOrPaidCourse(token, url);
    case "Advance":
      paidUrl = `/paid-courses/category/2`;
      freeUrl = `/free-courses/category/2`;
      console.log(paidUrl, freeUrl);
      return await queryCourse(token, paidUrl, freeUrl);
    case "Beginner":
      paidUrl = `/paid-courses/category/1`;
      freeUrl = `/free-courses/category/1`;
      return await queryCourse(token, paidUrl, freeUrl);
    case "Intermediate":
      paidUrl = `/paid-courses/category/3`;
      freeUrl = `/free-courses/category/3`;
      return await queryCourse(token, paidUrl, freeUrl);
  }
};

const getFreeOrPaidCourse = async (token, url) => {
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

const getFreeCourseByCategory = async (token, url) => {
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

const getPaidCourseByCategory = async (token, url) => {
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

const queryCourse = async (token, paidUrl, freeUrl) => {
  const response = await Promise.all([
    getPaidCourseByCategory(token, paidUrl),
    getFreeCourseByCategory(token, freeUrl),
  ]);
  const data1 = response[0];
  const data2 = response[1];
  const array = data1.concat(data2);
  return { data: array };
};
