import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "./features/login/Login";
import SignUp from "./features/signup/SignUp";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import Dashboard from "./features/dashboard/Dashboard";
import Profile from "./features/profile/Profile";
import LayoutWrapper from "./features/layout/Layout";
import NotFound from "./components/notfound/NotFound";
import UnAuthorized from "./components/unauthorized/UnAuthorized";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LayoutWrapper />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          { path: "*", element: <NotFound /> },
        ],
      },
      { path: "unauthorized", element: <UnAuthorized /> },
      { path: "*", element: <Login />, replace: true },
    ],
  },
]);

export default router;
