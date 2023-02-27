import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AMERICANEXPRESS, OTHERCARDS } from "../../constants";
import { addPurchase } from "../../fetches/addPurchase";
import { listOfMonths } from "../../listOfMonths";
import { listOfStates } from "../../ListOfStates";
import { listOfYears } from "../../listOfYears";
import { useCarvingContext } from "../../providers/carvings.provider";
import {
  cardNumberValidation,
  onlyNumberValidation,
  onlyTextValidation,
  securityCodeValidation,
} from "../../validations";
import { NavBar } from "../NavBar/NavBar";
import "./CheckoutPage.css";
// restructure code, escpecially the tsx

export const CheckoutPage = () => {
  const location = useLocation();
  const [total, setTotal] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("AL : Alabama");
  const [zip, setZip] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireMonth, setExpireMonth] = useState("Jan");
  const [expireYear, setExpireYear] = useState("2023");
  const [securityCode, setSecurityCode] = useState("");
  const [cardLength, setCardLength] = useState(19);
  const [cardType, setCardType] = useState("");
  const { cartItems } = useCarvingContext();

  const findTotal = () => {
    setTotal(parseInt(location.state.subtotal) + 12.99);
  };

  const findDebitCardType = (cardNumber: string) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card]))
        return card;
    }
    return "";
  };

  const findCardLength = (cardType: string) => {
    if (cardType === "AMERICAN_EXPRESS") {
      return AMERICANEXPRESS.length;
    } else {
      return OTHERCARDS.length;
    }
  };

  const handleValidations = (name: string, value: string) => {
    const validations = {
      name: (value: string) => onlyTextValidation(value),
      address: () => "",
      city: (value: string) => onlyTextValidation(value),
      zip: (value: string) => onlyNumberValidation(value),
      cardnumber: (value: string) => cardNumberValidation(value),
      securitycode: (value: string) => securityCodeValidation(3, value),
    };
    if (name === "cardnumber") {
      const card = findDebitCardType(value);
      const length = findCardLength(card);
      setCardLength(length);
      setCardType(card);
    }
    validations[name](value);
  };

  const handleBlur = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    handleValidations(name, value);
  };

  const updateValue = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "city":
        setCity(value);
        break;
      case "state":
        setState(value);
        break;
      case "zip":
        setZip(value);
        break;
      case "cardnumber":
        let mask = value.split(" ").join("");
        mask = mask.match(new RegExp(".{1,4}", "g")).join(" ");
        setCardNumber(mask);
        break;
      case "card-month-expire":
        setExpireMonth(value);
        break;
      case "card-year-expire":
        setExpireYear(value);
        break;
      case "securitycode":
        setSecurityCode(value);
    }
    handleValidations(name, value);
  };

  const inputData = [
    {
      label: "Full Name (First and Last)",
      name: "name",
      value: name,
      onChange: updateValue,
    },
    {
      label: "Address",
      name: "address",
      value: address,
      onChange: updateValue,
    },
    {
      label: "City",
      name: "city",
      value: city,
      onChange: updateValue,
    },
  ];

  const getUserId = () => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      const userId = JSON.parse(user)["id"];
      return userId;
    }
  };

  const navigate = useNavigate();

  const recordPurchase = () => {
    const formData = {
      userId: getUserId(),
      carvingId: cartItems.map((item) => item.id),
      name: name,
      address: address,
      city: city,
      state: state,
      zip: zip,
      cardType: cardType,
      cardNumbers: cardNumber,
      expMonthDate: expireMonth,
      expYearDate: expireYear,
    };
    addPurchase(formData).then((res) => {
      if (res.ok) {
        navigate("/ConfirmationPage");
      }
    });
  };

  useEffect(() => {
    findTotal();
  }, []);
  return (
    <div className="checkout-page-wrapper">
      <NavBar />
      <div className="form-info-wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            recordPurchase();
          }}
        >
          <h2>Shipping Information</h2>
          {inputData.map((input) => (
            <>
              <label htmlFor={input.name}>{input.label}</label>
              <input
                type="text"
                name={input.name}
                placeholder={input.label}
                onChange={input.onChange}
                onBlur={handleBlur}
              />
            </>
          ))}

          <label htmlFor="state">State</label>
          <select
            value={state}
            name="state"
            id="stateId"
            onChange={updateValue}
          >
            {listOfStates.map((state) => (
              <option value={state}>{state}</option>
            ))}
          </select>
          <label htmlFor="zip">Zip</label>
          <input
            type="text"
            name="zip"
            placeholder="Zip"
            value={zip}
            onChange={updateValue}
            onBlur={handleBlur}
            maxLength={5}
          />
          <h2>Payment</h2>
          <label htmlFor="card-number">Card Numbers</label>
          <input
            name="cardnumber"
            type="text"
            value={cardNumber}
            onChange={updateValue}
            onBlur={handleBlur}
            maxLength={cardLength}
          />
          <div className="expire-wrapper">
            <label htmlFor="card-month-expire">Expire Month</label>
            <select
              name="card-month-expire"
              id=""
              value={expireMonth}
              onChange={updateValue}
            >
              {listOfMonths.map((month) => (
                <option>{month}</option>
              ))}
            </select>
            <label htmlFor="card-year-expire">Expire Year</label>
            <select
              name="card-year-expire"
              id=""
              value={expireYear}
              onChange={updateValue}
            >
              {listOfYears.map((year) => (
                <option>{year}</option>
              ))}
            </select>
          </div>
          <label htmlFor="cvs">cvs</label>
          <input
            type="text"
            placeholder="cvs"
            name="securitycode"
            value={securityCode}
            onChange={updateValue}
            onBlur={handleBlur}
            maxLength={3}
          />
          <input type="submit" />
        </form>
      </div>
      <div className="total-wrapper">
        <div>
          <h3>subtotal</h3>
          <p>{location.state.subtotal}</p>
        </div>
        <div>
          <h3>shipping</h3>
          <p>12.99</p>
        </div>
        <div>
          <h3>Total</h3>
          <p>{total}</p>
        </div>
      </div>
    </div>
  );
};
