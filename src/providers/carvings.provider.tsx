import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { addToUserCart } from "../fetches/addToUserCart";
import { deleteCartFetch } from "../fetches/deleteCartFetch";
import { fetchUsersCart } from "../fetches/fetchUsersCart";
import { fetchCarvings } from "../fetches/fetcthCarvings";
import { Carving } from "../interfaces";
import { get } from "http";

interface CarvingContextInterface {
  carvingArray: Carving[];
  addPurchaseItems: (item: Carving) => void;
  cartItems: Carving[];
  openModal: boolean;
  openCartModal: () => void;
  deleteItemsFromCartAfterPurchase: () => void;
  fetchAllCarvings: () => void;
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

  const addPurchaseItems = async (item: Carving) => {
    const userId = getUserId();
    if (userId === undefined) {
      toast.error("Please log In to add carving to cart");
      return;
    }
    const token = localStorage.getItem("token");
    const addToCart = await addToUserCart(item, userId, token || "");
    if (addToCart.ok) {
      toast.success("Added to cart");
      setCartItems([...cartItems, item]);
    } else if (addToCart.status === 401) {
      toast.error(
        "Your session has ended please log In to add carving to cart"
      );
    } else {
      addToCart.json().then((data) => {
        toast.error(data.message);
      });
    }
  };

  const refreshCart = async () => {
    const userId = getUserId();
    const getUserCart = await fetchUsersCart(userId);
    if (getUserCart.length) {
      setCartItems([...getUserCart]);
    } else {
      setCartItems([]);
    }
  };

  const deleteItemsFromCartAfterPurchase = async () => {
    const getId = getUserId();
    deleteCartFetch(getId);
    setCartItems([]);
  };

  const fetchAllCarvings = async () => {
    const carvings = await fetchCarvings();
    setCarvingArray(carvings);
  };

  useEffect(() => {
    fetchAllCarvings();
  }, []);

  useEffect(() => {
    const user = getUserId();
    if (user !== undefined) {
      refreshCart();
    }
  }, [cartItems.length]);

  return (
    <CarvingContext.Provider
      value={{
        carvingArray,
        addPurchaseItems,
        cartItems,
        openModal,
        openCartModal,
        deleteItemsFromCartAfterPurchase,
        fetchAllCarvings,
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
    fetchAllCarvings: context.fetchAllCarvings,
  };
};
