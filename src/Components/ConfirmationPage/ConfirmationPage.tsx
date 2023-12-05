import { useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import "./ConfirmationPage.css";

export const ConfirmationPage = () => {
  const navigate = useNavigate();

  const backHome = () => navigate("/");
  return (
    <div className="confirmation-page-wrapper">
      <NavBar />
      <div className="confirmation-div">
        <p>
          Thank you for your purchase! We will get your carving sent out as soon
          as possible
        </p>
        <div>
          <button className="home-button" onClick={backHome}>
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};
