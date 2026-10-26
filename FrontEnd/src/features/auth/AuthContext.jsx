import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onUserLoggedIn = (userInfo) => {
    setLoggedInUser(userInfo);
    setIsLoggedIn(true);
  };

  const onUserLogOut = (userInfo) => {
    setLoggedInUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ onUserLoggedIn, onUserLogOut, isLoggedIn, loggedInUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
