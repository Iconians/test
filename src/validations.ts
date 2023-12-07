export const emailValidation = (value: string) => {
  if (value) {
    if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const passwordValidation = (value: string) => {
  if (value) {
    if (
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
        value
      ) &&
      value.length <= 20
    ) {
      return true;
    } else {
      return false;
    }
  }
};

export const onlyTextValidation = (value: string) => {
  if (value) {
    if (/^[a-zA-Z ]*$/i.test(value)) {
      // return "";
      return true;
    } else {
      return false;
    }
  } else {
    return undefined;
  }
};

export const onlyNumberValidation = (value: string) => {
  if (value) {
    if (/^[0-9]*$/.test(value)) {
      return true;
    } else {
      false;
    }
  } else {
    return undefined;
  }
};

export const cardNumberValidation = (cardNumber: string) => {
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
  };
  for (const card in regexPattern) {
    if (
      !cardNumber
        .replace(/[^\d]/g, "")
        .match(new RegExp(regexPattern[card as keyof typeof regexPattern]))
    ) {
      continue;
    }
    if (cardNumber && card === "AMERICAN_EXPRESS") {
      return cardNumber &&
        /^[1-6]{1}[0-9]{13,14}$/i.test(cardNumber.replace(/[^\d]/g, "").trim())
        ? true
        : false;
    } else {
      return cardNumber &&
        /^[1-6]{1}[0-9]{15,16}$/i.test(cardNumber.replace(/[^\d]/g, "").trim())
        ? true
        : false;
    }
  }
  return false;
};

export const securityCodeValidation = (min: number, value: string) =>
  value.length < 3 ? false : true;
