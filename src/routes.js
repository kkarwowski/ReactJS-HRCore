import { Navigate, useRoutes, useLocation } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { useAuth } from "./utils/context/AuthContext";
import Page404 from "./pages/Page404";
import Associates from "./pages/Associates";
import NewAssociate from "./components/Associate/newAssociate";
import AssociateDetails from "./pages/AssociateDetails";
import Admin from "./pages/Admin";
import MyTasks from "./pages/Tasks";
import Page403 from "./pages/Page403";
import ImportAssociates from "./components/Associate/Admin/ImportAssociates";
import PrivateRoute from "./pages/PrivateRoute";
// ----------------------------------------------------------------------

export default function Router() {
  const { currentUser, isAdmin } = useAuth();
  let location = useLocation();
  // console.log("location", location);
  return useRoutes([
    {
      path: "/dashboard",
      element: currentUser ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/home" replace /> },
        {
          path: "home",
          element: (
            <PrivateRoute role="Standard">
              <Home />
            </PrivateRoute>
          ),
        },
        {
          path: "associates",
          element: (
            <PrivateRoute role="Standard">
              <Associates />
            </PrivateRoute>
          ),
        },
        { path: "associates/:id", element: <AssociateDetails /> },
        { path: "associates/newassociate", element: <NewAssociate /> },
        { path: "register", element: isAdmin ? <SignUp /> : <Page403 /> },
        { path: "tasks", element: <MyTasks /> },
        {
          path: "admin/database",
          element: (
            <PrivateRoute role="Admin">
              <Admin />
            </PrivateRoute>
          ),
        },
        {
          path: "admin/import",
          element: isAdmin ? <ImportAssociates /> : <Page403 />,
        },
        { path: "/dashboard/*", element: <Page404 /> },
      ],
    },
    {
      path: "/",
      element: !currentUser ? (
        <LogoOnlyLayout />
      ) : (
        <Navigate to="/dashboard/home" />
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "/", element: <Navigate to="/dashboard/home" /> },
        { path: "/error", element: <Page404 /> },
      ],
    },
    { path: "*", element: <Navigate to="/error" replace /> },
  ]);
}
