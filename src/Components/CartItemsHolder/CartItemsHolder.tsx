import { useCarvingContext } from "../../providers/carvings.provider";
import "./CartItemsHolder.css";

export const CartItemHolder = () => {
  const { cartItems } = useCarvingContext();
  console.log(cartItems);
  return (
    <div className="cart-itms-wrapper">
      <>
        <h3>Cart Items</h3>
        {cartItems.map((carving) => (
          <div className="cart-card-wrapper">
            <div className="cart-h2-wrapper" key={carving.id}>
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
