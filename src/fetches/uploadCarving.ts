export const uploadCarvings = (carving: object, token: string) => {
  console.log(carving);
  return fetch("http://localhost:3000/user/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(carving),
  });
};
