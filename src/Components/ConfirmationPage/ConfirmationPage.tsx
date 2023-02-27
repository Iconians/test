import { NavBar } from "../NavBar/NavBar";
import "./ConfirmationPage.css";

export const ConfirmationPage = () => {
  return (
    <div className="confirmation-page-wrapper">
      <NavBar />
      <div className="confirmation-div">
        <p>
          Thank you for your purchase! We will get your carving sent out as soon
          as possible
        </p>
      </div>
    </div>
  );
};
