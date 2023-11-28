import { Favorite } from "../interfaces";

export const deleteFavorites = (getFavorite: Favorite, userId: number) => {
  return fetch(
    `http://localhost:3000/user/favorites/${getFavorite.carvingId}/${userId}`,
    {
      method: "DELETE",
    }
  );
};
