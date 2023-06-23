"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { IUser } from "../interfaces";

type TUserContext = {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
};

export const UserContext = createContext<TUserContext>({
  user: {
    email: "",
    name: "",
  },
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
});

export const UserProvider = ({ ...props }) => {
  const { children } = props;

  const loggedStatus =
    (typeof window !== "undefined" && localStorage.getItem("loginStatus")) ||
    "false";

  const userInfo =
    typeof window !== "undefined" && localStorage.getItem("user");
  const [user, setUser] = useState<IUser>(
    userInfo ? JSON.parse(userInfo) : { email: "", name: "" }
  );
  const [isLogged, setIsLogged] = useState<boolean>(
    false || (loggedStatus === "true" ? true : false)
  );

  return (
    <UserContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>
      {children}
    </UserContext.Provider>
  );
};
