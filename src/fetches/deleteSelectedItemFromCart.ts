import { Carving } from "../interfaces";

export const deleteSelectedItemFromCart = (
  carving: Carving,
  userId: number
) => {
  return fetch(`http://localhost:3000/user/cart/${carving.id}/${userId}`, {
    method: "DELETE",
  });
};
