import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { addToUserCart } from "../fetches/addToUserCart";
import { deleteCartFetch } from "../fetches/deleteCartFetch";
// import { fetchUsersCart } from "../fetches/fetchUsersCart";
import { fetchCarvings } from "../fetches/getCarvings";
import { Carving, userCart } from "../interfaces";

interface CarvingContextInterface {
  carvingArray: Carving[];
  addPurchaseItems: (item: Carving) => void;
  cartItems: Carving[];
  openModal: boolean;
  openCartModal: () => void;
  deleteItemsFromCartAfterPurchase: () => void;
}

type CarvingProviderProps = {
  children?: JSX.Element | JSX.Element[];
};

const CarvingContext = createContext({} as CarvingContextInterface);

export const CarvingProvider = ({ children }: CarvingProviderProps) => {
  const [carvingArray, setCarvingArray] = useState<Carving[]>([]);
  const [cartItems, setCartItems] = useState<Carving[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const openCartModal = () => {
    if (openModal === false) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  };

  const getUserId = () => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      const userId = JSON.parse(user)["id"];
      return userId;
    }
  };

  const addPurchaseItems = (item: Carving) => {
    const userId = getUserId();
    if (userId === undefined) {
      toast.error("Please log In to add carving to cart");
      return;
    }
    // addToUserCart(item, userId);
    // setCartItems([...cartItems, item]);
  };

  const findCart = (usersCart: userCart[], carvings: Carving[]) => {
    const user = getUserId();
    let arr: Carving[] = [];
    usersCart
      .filter((favorite) => favorite.userId === user)
      .map((favorite) => {
        let findCarving = carvings.find(
          (carving) => carving.id === favorite.productId
        );
        if (findCarving !== undefined) arr.push(findCarving);
      });
    return arr;
  };

  const fetchCart = async () => {
    // const carvings = await fetchCarvings();
    // // const userCart = await fetchUsersCart();
    // return findCart(userCart, carvings);
  };

  const checkCart = async () => {
    const cart = await fetchCart();
    // setCartItems(cart);
  };

  const deleteItemsFromCartAfterPurchase = async () => {
    // const getCartItems = await fetchUsersCart();
    // const getId = getUserId();
    // const filterCart = getCartItems.filter((item) => item.userId === getId);
    // for (let item of filterCart) {
    //   deleteCartFetch(item.id);
    // }
    // setCartItems([]);
  };

  useEffect(() => {
    checkCart();
    fetchCarvings().then((data) => setCarvingArray(data));
  }, []);

  return (
    <CarvingContext.Provider
      value={{
        carvingArray,
        addPurchaseItems,
        cartItems,
        openModal,
        openCartModal,
        deleteItemsFromCartAfterPurchase,
      }}
    >
      {children}
    </CarvingContext.Provider>
  );
};

export const useCarvingContext = () => {
  const context = useContext(CarvingContext);
  return {
    carvingArray: context.carvingArray,
    addPurchaseItems: context.addPurchaseItems,
    cartItems: context.cartItems,
    openModal: context.openModal,
    openCartModal: context.openCartModal,
    deleteItemsFromCartAfterPurchase: context.deleteItemsFromCartAfterPurchase,
  };
};
