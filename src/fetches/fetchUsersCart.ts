import { userCart } from "../interfaces";

export const fetchUsersCart = async (userId: number) => {
  return fetch(`http://localhost:3000/user/cart/${userId}`).then((res) =>
    res.json()
  );
};
