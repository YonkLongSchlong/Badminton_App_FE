export default updateAvatar = async ({ id, formData, token }) => {
  const response = await fetch(process.env.EXPO_PUBLIC_BASE_URL + `/users/avatar/${id}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    method: "PATCH",
    body: formData,
  });
  return await response.json();
};

