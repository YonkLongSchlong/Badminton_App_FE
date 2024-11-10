export default login = async ({ email, password }) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + "/auth/login",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        role: "user",
        email: email,
        password: password,
      }),
    }
  );
  return await response.json();
};
