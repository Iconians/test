import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavButtons.css";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

interface props {
  openCartModal: () => void;
}

export const NavButtons = ({ openCartModal }: props) => (
  <div className="nav-btn-wrapper">
    <div className="button-div">
      <Link className="signIn-link" to="/SignInPage">
        Sign In
      </Link>
    </div>
    <div className="cart-icon-div" onClick={openCartModal}>
      <FontAwesomeIcon className="cart-icon" icon={faCartShopping} />
    </div>
  </div>
);
