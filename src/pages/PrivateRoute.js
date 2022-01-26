import { useAuth } from "../utils/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Page403 from "./Page403";
import Logo from "../components/Logo";
import { Stack } from "@mui/material";

const PrivateRoute = ({ children, role }) => {
  const { currentUser, isAdmin } = useAuth();
  // console.log(currentUser, "Route current user");
  // const userHasRole = role.includes(currentUser.Role) ? true : false;
  let location = useLocation();

  if (currentUser === undefined) {
    return (
      <>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          alignContent="center"
        >
          <Logo sx={{ width: 200, height: 200 }} />
          Loading...
        </Stack>
      </>
    );
  } else if (currentUser === null) {
    console.log("ting to", location);
    return <Navigate to="/login" state={{ from: location }} />;
  } else {
    if (role === "Admin") {
      if (!isAdmin && currentUser) {
        return <Page403 />;
      }
    }
    return children;
  }
};

export default PrivateRoute;
