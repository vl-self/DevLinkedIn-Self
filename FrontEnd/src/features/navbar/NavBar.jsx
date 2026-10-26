import React from "react";
import { Link, useLocation } from "react-router";
import "./navbar.css";

const navLinks = [
  {
    name: "Dashboard",
    linkTo: "/dashboard",
  },
  {
    name: "Profile",
    linkTo: "/profile",
  },
  {
    name: "settings",
    linkTo: "/Settings",
  },
  {
    name: "Subscriptions",
    linkTo: "/subscriptions",
  },
];

const NavBar = () => {
  const location = useLocation();

  return (
    <aside aria-label="Main Navigation">
      <nav>
        <ul>
          {navLinks.map((item) => {
            const activeCls = item.linkTo.match(location.pathname)
              ? "active"
              : "";
            return (
              <div className={`navItem ${activeCls}`}>
                <Link to={item.linkTo}>{item.name}</Link>
              </div>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default NavBar;
