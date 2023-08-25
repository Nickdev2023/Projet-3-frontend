import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
import myApi from "../api/service";

function AuthContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function authenticateUser() {
    console.log("here");
    myApi
      .verifyUser()
      .then((response) => {
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(response.data.user);
      })
      .catch((error) => {
        setUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
        console.log(error);
      });
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  // const updater = () => {}
  return (
    <UserContext.Provider
      value={{ user, authenticateUser, isLoggedIn, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default AuthContextWrapper;
