import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { newUser, Users } from "../interfaces";
import { signInUser } from "../fetches/signInUser";
import { CreateAUser } from "../fetches/CreateAUser";

interface AuthContextInterface {
  user: Users | undefined;
  createUser: (user: newUser, redirectToHome: () => void) => void;
  signInCurrentUser: (
    email: string,
    password: string,
    redirectToHome: () => void
  ) => void;
  signOutUser: () => void;
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
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("user", JSON.stringify(res.userInfo));
        redirectToHome();
        toast.success("Created Account and Logged In");
      } else {
        toast.error(res.message);
      }
    });
  };

  const signInCurrentUser = async (
    email: string,
    password: string,
    redirectToHome: () => void
  ) => {
    await signInUser(email, password).then((turnToJson) => {
      if (turnToJson.userinfo !== undefined) {
        setUser(turnToJson.userinfo);
        sessionStorage.setItem("user", JSON.stringify(turnToJson.userinfo));
        sessionStorage.setItem("token", turnToJson.token);
        redirectToHome();
        toast.success("signed In");
      } else {
        toast.error(turnToJson.message);
      }
    });
  };

  const signOutUser = () => {
    setUser(undefined);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  };

  useEffect(() => {
    const userSignIn = sessionStorage.getItem("user");
    if (userSignIn) {
      setUser(JSON.parse(userSignIn));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        createUser,
        signInCurrentUser: signInCurrentUser,
        signOutUser: signOutUser,
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
    signInUser: context.signInCurrentUser,
    signOutUser: context.signOutUser,
  };
};
