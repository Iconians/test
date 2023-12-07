import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCarvingContext } from "../../providers/carvings.provider";
import "./CartItemsHolder.css";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { Carving } from "../../interfaces";

export const CartItemHolder = () => {
  const { cartItems, deleteItemFromCart } = useCarvingContext();

  const deleteItem = (carving: Carving) => {
    deleteItemFromCart(carving);
  };
  return (
    <div className="cart-items-wrapper">
      <>
        <h3>Cart Items</h3>
        {cartItems.map((carving) => (
          <div className="cart-card-wrapper" key={carving.id}>
            <FontAwesomeIcon
              className="fa-x item-x"
              icon={faRectangleXmark}
              onClick={() => deleteItem(carving)}
            />
            <div className="cart-h2-wrapper">
              <h2>{carving.carvingName}</h2>
            </div>
            <div className="cart-product-img-wrapper">
              <img src={carving.image} alt="" />
            </div>
            <div>
              <p>{`$${carving.price?.toFixed(2)}`}</p>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};
