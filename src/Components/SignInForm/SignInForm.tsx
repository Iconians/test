import { useState } from "react";
import { useAuthContext } from "../../providers/auth.provider";
import "./SignInForm.css";

interface props {
  changeForm: () => void;
  redirectToHome: () => void;
}

export const SignInForm = ({ changeForm, redirectToHome }: props) => {
  const { signinUser } = useAuthContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const captureInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const formSignin = () => {
    signinUser(email, password, redirectToHome);
  };

  return (
    <div>
      <div className="h2-wrapper">
        <h2>Sign In</h2>
      </div>
      <div className="form-wrapper">
        <form
          action=""
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            formSignin();
          }}
        >
          <label htmlFor="Email">Email</label>
          <input
            className="text-inputs"
            name="email"
            type="text"
            placeholder="Email"
            onChange={captureInput}
          />
          <label htmlFor="password">Password</label>
          <input
            className="text-inputs"
            name="password"
            type="password"
            placeholder="Password"
            onChange={captureInput}
          />
          <input type="submit" value="Sign In" />
        </form>
        <div>
          <button className="signinBtn" onClick={changeForm}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};
