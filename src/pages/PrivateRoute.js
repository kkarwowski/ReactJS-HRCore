import { useAuth } from "../utils/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Page403 from "./Page403";

const PrivateRoute = ({ children, role }) => {
  const { currentUser, isAdmin } = useAuth();
  // const userHasRole = role.includes(currentUser.Role) ? true : false;
  let location = useLocation();
  let authToken = sessionStorage.getItem("Auth Token");
  console.log("current user", currentUser);
  if (!authToken) {
    console.log("navigating to", location);
    return <Navigate to="/login" state={{ from: location }} />;
  } else {
    if (role === "Admin") {
      if (!isAdmin && authToken) {
        return <Page403 />;
      }
    }
    return children;
  }
};

export default PrivateRoute;
