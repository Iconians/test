import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { addToUserCart } from "../fetches/addToUserCart";
import { deleteCartFetch } from "../fetches/deleteCartFetch";
import { fetchUsersCart } from "../fetches/fetchUsersCart";
import { fetchCarvings } from "../fetches/fetcthCarvings";
import { Carving, userCart } from "../interfaces";
import { useAuthContext } from "./auth.provider";
import { add } from "lodash-es";

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
  const { token } = useAuthContext();

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

  const addPurchaseItems = async (item: Carving) => {
    const userId = getUserId();
    if (userId === undefined) {
      toast.error("Please log In to add carving to cart");
      return;
    }
    const addToCart = await addToUserCart(item, userId, token);
    if (addToCart.ok) {
      toast.success("Added to cart");
      setCartItems([...cartItems, item]);
    } else {
      addToCart.json().then((data) => {
        toast.error(data.message);
      });
    }
  };

  const checkCart = async () => {
    const userId = getUserId();
    const getUserCart = await fetchUsersCart(userId);
    console.log(getUserCart);
    if (getUserCart.length) {
      setCartItems([...getUserCart]);
    } else {
      setCartItems([]);
    }
  };

  const deleteItemsFromCartAfterPurchase = async () => {
    const getId = getUserId();
    const deleteCart = deleteCartFetch(getId);
    console.log(deleteCart);
    setCartItems([]);
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
