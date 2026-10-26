import React from "react";
import NavBar from "../navbar/NavBar";
import { Outlet } from "react-router";
import { useAuth } from "../auth/AuthContext";

const LayoutWrapper = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="contentWrapper">
      {isLoggedIn && (
        <div className="sideBarWrapper">
          <NavBar />
        </div>
      )}

      <main className="mainContent">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutWrapper;
