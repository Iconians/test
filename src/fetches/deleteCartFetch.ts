export const deleteCartFetch = (itemId: number) => {
  return fetch(`http://localhost:3000/userCart/${itemId}`, {
    method: "DELETE",
  });
};

//       Authorization: `Bearer ${token}`,
