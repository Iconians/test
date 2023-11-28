import { Carving } from "../interfaces";

export const fetchCarvings = async () => {
  return await fetch("http://localhost:3000/carvings").then((res) =>
    res.json()
  );
};
