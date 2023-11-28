import { Favorite } from "../interfaces";
const loggit = <T>(something: T) => {
  // leave for example of how to console.log in a promise
  console.log(something);
  return something;
};

export const fetchFavorites = async (userId: number) => {
  return fetch(`http://localhost:3000/user/favorites/${userId}`).then((data) =>
    data.json()
  );
  // .then(loggit);
};
