export default otp = async ({ email, otp }) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + "/auth/verify-otp",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        role: "user",
        email: email,
        otp: otp,
      }),
    }
  );
  return await response.json();
};
