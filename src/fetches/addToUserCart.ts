import { Carving } from "../interfaces";

export const addToUserCart = (item: Carving, userId: number, token: string) => {
  return fetch("http://localhost:3000/user/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: userId, productId: item.id }),
  });
};
