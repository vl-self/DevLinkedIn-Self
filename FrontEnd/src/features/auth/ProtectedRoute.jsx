import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  // Step 1: Authentication check
  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // // Step 2: Authorization check
  // if (allowedRoles && !allowedRoles.includes(loggedInUser.role)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  // Step 3: Render the matching child route
  return <Outlet />;
}
