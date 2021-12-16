import { useAuth } from "../utils/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Page403 from "./Page403";

const PrivateRoute = ({ children, role }) => {
  const { currentUser, isAdmin } = useAuth();
  const userHasRole = role.includes(currentUser.Role) ? true : false;
  let location = useLocation();

  if (!currentUser) {
    console.log("ting to", location);
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (role === "Admin") {
    if (!isAdmin && currentUser) {
      return <Page403 />;
    }
  }
  return children;
};

export default PrivateRoute;
