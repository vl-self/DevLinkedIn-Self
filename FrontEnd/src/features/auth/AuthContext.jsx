import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const onUserLoggedIn = (userInfo) => {
    setLoggedInUser(userInfo);
    setIsLoggedIn(true);
  };

  const onUserLogOut = () => {
    setLoggedInUser(null);
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
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
