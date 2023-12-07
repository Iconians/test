import VISA_ICON from "./assets/visa.png";
import AMERICAN_EXPRESS_ICON from "./assets/amex.png";
import MASTER_CARD_ICON from "./assets/masterCard.png";
import DISCOVER_ICON from "./assets/discover.png";
export const OTHER_CARDS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const AMERICAN_EXPRESS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const CARD = ["VISA", "MASTERCARD", "AMERICAN_EXPRESS", "DISCOVER"];

export const CardIcon = {
  VISA: VISA_ICON,
  MASTERCARD: MASTER_CARD_ICON,
  AMERICAN_EXPRESS: AMERICAN_EXPRESS_ICON,
  DISCOVER: DISCOVER_ICON,
};
