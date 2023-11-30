import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Carving } from "../../interfaces";
import { useCarvingContext } from "../../providers/carvings.provider";
import { CartItemHolder } from "../CartItemsHolder/CartItemsHolder";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import "./CartModal.css";
import { useNavigate } from "react-router-dom";
import { set } from "lodash-es";

interface props {
  openModal: boolean;
  openCartModal: () => void;
}

export const CartModal = ({ openModal, openCartModal }: props) => {
  const { cartItems } = useCarvingContext();
  const [subtotal, setSubtotal] = useState<number | string>(0);
  const navigate = useNavigate();
  // console.log(cartItems);

  const findSubtotal = () => {
    let total = 0;
    cartItems.map((carving: Carving) => {
      if (carving.price !== null) total = total + carving.price;
    });
    setSubtotal(total.toFixed(2));
  };

  const goToCartPage = () => {
    navigate("/CheckoutPage", {
      state: { subtotal: subtotal, cartItems: cartItems },
    });
    openCartModal();
  };

  useEffect(() => {
    findSubtotal();
  }, [cartItems.length]);

  return (
    <div className={`cart-wrapper ${openModal === true ? "open" : null}`}>
      <FontAwesomeIcon
        className="fa-x"
        icon={faRectangleXmark}
        onClick={openCartModal}
      />
      <CartItemHolder />
      <div className="subtotal-wrapper">
        <h4>Subtotal</h4>
        <p>{`$${subtotal}`}</p>
      </div>
      <button
        onClick={goToCartPage}
        disabled={cartItems.length === 0}
        className="button"
      >
        Checkout
      </button>
    </div>
  );
};
