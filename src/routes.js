import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
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

// ----------------------------------------------------------------------

export default function Router() {
  const { currentUser, isAdmin } = useAuth();
  return useRoutes([
    {
      path: "/dashboard",
      element: currentUser ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/home" replace /> },
        { path: "home", element: <Home /> },
        { path: "associates", element: <Associates /> },
        { path: "associates/:id", element: <AssociateDetails /> },
        { path: "associates/newassociate", element: <NewAssociate /> },
        { path: "register", element: <SignUp /> },
        { path: "tasks", element: <MyTasks /> },
        {
          path: "admin/database",
          element: isAdmin ? <Admin /> : <Page403 />,
        },

        { path: "/dashboard/*", element: <Page404 /> },
        // { path: 'products', element: <Products /> },
        // { path: 'blog', element: <Blog /> }
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
        // { path: 'register', element: <Register /> },
        // { path: "error", element: <NotFound /> },
        { path: "/", element: <Navigate to="/login" /> },
        // { path: "*", element: <Navigate to="/error" /> },
      ],
    },
    { path: "*", element: <Navigate to="/error" replace /> },
    { path: "*", element: <Navigate to="/error" replace /> },
  ]);
}
