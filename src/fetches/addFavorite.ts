export const addFavorite = (userId: string, id: number) => {
  return fetch("http://localhost:3000/user/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId, carvingId: id }),
  });
};
