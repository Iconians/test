import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { newUser, Users } from "../interfaces";
import { signInUser } from "../fetches/signInUser";
import { CreateAUser } from "../fetches/CreateAUser";
import { getUsersCart } from "../fetches/getUsersCart";

interface AuthContextInterface {
  user: Users | undefined;
  createUser: (user: newUser, redirectToHome: () => void) => void;
  signinCurrentUser: (
    email: string,
    password: string,
    redirectToHome: () => void
  ) => void;
  signoutUser: () => void;
}

type AuthProviderProps = {
  children?: JSX.Element | JSX.Element[];
};

const AuthContext = createContext({} as AuthContextInterface);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Users>();

  const createUser = async (user: newUser, redirectToHome: () => void) => {
    await CreateAUser(user).then((res) => {
      if (res.userInfo !== undefined) {
        setUser(res.userInfo);
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.userInfo));
        redirectToHome();
        toast.success("Created Account and Logged In");
      } else {
        toast.error(res.message);
      }
    });
  };

  const signinCurrentUser = async (
    email: string,
    password: string,
    redirectToHome: () => void
  ) => {
    await signInUser(email, password).then((turnToJson) => {
      if (turnToJson.userinfo !== undefined) {
        setUser(turnToJson.userinfo);
        localStorage.setItem("user", JSON.stringify(turnToJson.userinfo));
        localStorage.setItem("token", turnToJson.token);
        redirectToHome();
        toast.success("signed In");
      } else {
        toast.error(turnToJson.message);
      }
    });
  };

  const signoutUser = () => {
    setUser(undefined);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const userSignIn = localStorage.getItem("user");
    if (userSignIn) {
      setUser(JSON.parse(userSignIn));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        createUser,
        signinCurrentUser,
        signoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return {
    user: context.user,
    createUser: context.createUser,
    signinUser: context.signinCurrentUser,
    signoutUser: context.signoutUser,
  };
};
