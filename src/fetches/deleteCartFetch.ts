export const deleteCartFetch = (itemId: number) => {
  return fetch(`http://localhost:3000/user/cart/${itemId}`, {
    method: "DELETE",
  });
};
