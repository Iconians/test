import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAuthContext } from "../../providers/auth.provider";
import { toast } from "react-hot-toast";
import { createAcctForm } from "../../formInputData";
import {
  emailValidation,
  onlyTextValidation,
  passwordValidation,
} from "../../validations";
import "./CreateAcctForm.css";

interface props {
  changeForm: () => void;
  redirectToHome: () => void;
}

export const CreateAcctForm = ({ changeForm, redirectToHome }: props) => {
  const { createUser } = useAuthContext();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [eye, setEye] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [inputError, setInputError] = useState(true);

  const captureInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmpassword":
        setConfirmPassword(value);
        break;
    }
  };

  const isInputValid = (name: string, value: string) => {
    const validations = {
      name: (value: string) => {
        const checkName = onlyTextValidation(value);
        if (!checkName) {
          toast.error("Alpabetical letters only");
          setInputError(true);
        } else {
          setInputError(false);
        }
      },
      email: (value: string) => {
        const checkEmail = emailValidation(value);
        if (!checkEmail) {
          toast.error("provide a correct email");
          setInputError(true);
        } else {
          setInputError(false);
        }
      },
      password: (value: string) => {
        const checkPassword = passwordValidation(value);
        if (!checkPassword) {
          toast.error("Invalid Password");
          setInputError(true);
        } else {
          setInputError(false);
        }
      },
    };
    validations[name as keyof typeof validations](value);
  };

  const newUser = () => {
    if (password === confirmPassword) {
      let newUser = {
        name: name,
        email: email,
        password: password,
      };
      createUser(newUser, redirectToHome);
    } else {
      toast.error("passwords don't match");
    }
  };

  const handleEye = () => {
    const input = document.getElementById("eye") as HTMLInputElement;
    if (input.type === "password") {
      input.type = "text";
      setEye(true);
    } else {
      input.type = "password";
      setEye(false);
    }
  };

  return (
    <div>
      <div>
        <div className="h2-wrapper">
          <h2>Create Account</h2>
        </div>
        <div className="form-wrapper">
          <form
            action=""
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              newUser();
            }}
          >
            <>
              {createAcctForm.map((input) => (
                <div key={input.id} className="create-form-inputs">
                  <label htmlFor={input.labelName}>{input.labeltext}</label>
                  <input
                    id={input.id}
                    name={input.inputName}
                    type={input.type}
                    placeholder={input.placeHolder}
                    onChange={captureInput}
                    onBlur={(e) => isInputValid(e.target.name, e.target.value)}
                  />
                  {input.inputName === "password" ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      className={`eye ${eye ? "clicked-eye" : ""}`}
                      onClick={handleEye}
                    />
                  ) : null}
                </div>
              ))}
              <input type="submit" value="Create Account" />
            </>
          </form>
          <div>
            <button className="signinBtn createAcctBtn" onClick={changeForm}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
