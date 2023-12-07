export const getFavorites = async (userId: number) => {
  return fetch(`http://localhost:3000/user/favorites/${userId}`).then((data) =>
    data.json()
  );
};
