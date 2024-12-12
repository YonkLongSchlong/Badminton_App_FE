export default updatePassword = async ({
  userId,
  token,
  password,
  newPassword,
}) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/users/${userId}/password`,
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + token,
      },
      method: "PATCH",
      body: JSON.stringify({
        password: password,
        newPassword: newPassword,
      }),
    }
  );
  return await response.json();
};
