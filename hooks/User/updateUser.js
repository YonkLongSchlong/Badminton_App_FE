export default updateUser = async ({
  id,
  firstName,
  lastName,
  email,
  gender,
  dob,
  token,
}) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/users/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        firstName,
        lastName,
        gender,
        dob,
        email,
      }),
    }
  );
  return await response.json();
};
