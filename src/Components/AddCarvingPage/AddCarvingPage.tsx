import { useState } from "react";
import { toast } from "react-hot-toast";
import { carvingPictures } from "../../assets/carvingPictures";
import { addCarvingForm } from "../../formInputData";
import { useFavoriteContext } from "../../providers/favorites.provider";
import { NavBar } from "../NavBar/NavBar";
import "./AddCarvingPage.css";
import { uploadCarvings } from "../../fetches/uploadCarving";
import { useAuthContext } from "../../providers/auth.provider";
import { useCarvingContext } from "../../providers/carvings.provider";

export const AddCarvingPage = () => {
  const [carvingName, setCarvingName] = useState("");
  const [image, setImage] = useState(carvingPictures.bear);
  const [handCarved, setHandCarved] = useState(true);
  const [machinedCarved, setMachinedCarved] = useState(false);
  const [availableToSell, setAvailableToSell] = useState(false);
  const [price, setPrice] = useState("");
  const [story, setStory] = useState("");
  const { getUserId } = useFavoriteContext();
  const { fetchAllCarvings } = useCarvingContext();
  const { token } = useAuthContext();

  const captureInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "carvingName":
        setCarvingName(value);
        break;
      case "typeOfCarving":
        if (value === "handCarving") {
          setHandCarved(true);
          setMachinedCarved(false);
        }
        if (value === "machinedCarving") {
          setHandCarved(false);
          setMachinedCarved(true);
        }
        break;
      case "sellCarving":
        setAvailableToSell(true);
        break;
      case "price":
        setPrice(value);
        break;
    }
  };

  const getUserName = () => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      const userId = JSON.parse(user)["name"];
      return userId;
    }
  };

  const validations = () => {
    if (!carvingName.length) {
      toast.error("name your carving");
      return false;
    }
    if (handCarved === null) {
      toast.error("select your carving type");
      return false;
    }
    if (availableToSell === true && !price.length) {
      toast.error("add a price to your carving");
      return false;
    }
    if (!story.length) {
      toast.error("write a description for your carving");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setCarvingName("");
    setImage(carvingPictures.bear);
    setHandCarved(true);
    setMachinedCarved(false);
    setAvailableToSell(false);
    setPrice("");
    setStory("");
  };

  const newCarving = () => {
    // when form submits we do this stuff
    const areInputsValid = validations();
    if (areInputsValid === true) {
      const carving = {
        carvingName: carvingName,
        image: image,
        story: story,
        type: handCarved ? "handCarved" : "machinedCarved",
        availableToPurchase: availableToSell,
        price: price.length ? parseInt(price) : 0,
        userId: getUserId(),
        carverName: getUserName(),
        qty: 1,
      };

      uploadCarvings(carving, token).then((data) => {
        if (data.ok === true) {
          resetForm();
          fetchAllCarvings();
          toast.success("Carving added, do you want to add another?");
        } else {
          data.json().then((err) => {
            toast.error(err.message);
          });
        }
      });
    }
  };

  const setValue = (name: string) => {
    if (name === "Hand Carved") {
      return handCarved;
    }
    if (name === "Machined Carved") {
      return machinedCarved;
    }
    if (name === "Do you want to sell this carving?") {
      return availableToSell;
    }
  };

  return (
    <div className="add-carving-page-wrapper">
      <NavBar />
      <div className="add-carving-h2">
        <h2>Upload your Carving</h2>
      </div>
      <div className="form-wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            newCarving();
          }}
        >
          {addCarvingForm.map((input) =>
            input.type !== "radio" ? (
              <>
                <label htmlFor={input.name}>{input.labelName}</label>
                <input
                  name={input.name}
                  type={input.type}
                  placeholder={input.placeHolder}
                  onChange={captureInput}
                  value={carvingName}
                />
              </>
            ) : (
              <div className="radio-input">
                <input
                  name={input.name}
                  type={input.type}
                  placeholder={input.placeHolder}
                  checked={setValue(input.labelName)}
                  onChange={captureInput}
                  value={input.value}
                />
                <label htmlFor={input.name}>{input.labelName}</label>
              </div>
            )
          )}
          {availableToSell === true ? (
            <>
              <label htmlFor="">Price</label>
              <input
                type="text"
                name="price"
                placeholder="Price"
                onChange={captureInput}
                value={price}
              />
            </>
          ) : null}
          <label htmlFor="image">Image</label>
          <select
            className="img-select"
            name="image"
            id=""
            onChange={(e) => {
              setImage(e.target.value);
            }}
            value={image}
          >
            {Object.entries(carvingPictures).map(([label, pictureValue]) => {
              return <option value={pictureValue}>{label}</option>;
            })}
          </select>
          <label htmlFor="story" className="textarea-label">
            Write your Story
          </label>
          <textarea
            name="story"
            cols={30}
            rows={10}
            className="textarea"
            onChange={(e) => setStory(e.target.value)}
            value={story}
          ></textarea>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
