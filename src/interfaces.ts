export interface Carving {
  id: number;
  image: string;
  carvingName: string;
  userId: number;
  carverName: string;
  availableToPurchase: boolean;
  story: string;
  type: string;
  price: null | number;
  qty: number;
}

export interface Favorite {
  userId: number;
  carvingId: number;
  id: number;
}

export interface Users {
  id: number;
  name: string;
  email: string;
}

export interface newUser {
  name: string;
  email: string;
  password: string;
}

export interface userCart {
  userId: number;
  productId: number;
  id: number;
}
