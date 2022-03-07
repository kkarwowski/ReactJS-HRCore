import "./App.css";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// import Router from "./routes";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  associatesContext,
  officesContext,
  updateAssociatesContext,
  loadingContext,
  departmentsContext,
  resultsPerPageContext,
  tasksToApproveContext,
  notificationsContext,
} from "./utils/context/contexts";
import {
  ref,
  onValue,
  getDatabase,
  query,
  limitToFirst,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./utils/firebase";
import { AuthContext } from "./utils/context/AuthContext";
import {
  createUserWithEmailAndPassword,
  updateEmail,
  signOut,
  signInWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./utils/firebase";
import DashboardLayout from "./layouts/dashboard";
import Associates from "./pages/Associates";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Thanks from "./pages/Thanks";
import AssociateDetails from "./pages/AssociateDetails";
import NewAssociate from "./components/Associate/newAssociate";
import Page404 from "./pages/Page404";
import SignUp from "./pages/SignUp";
import MyTasks from "./pages/Tasks";
import PrivateRoute from "./pages/PrivateRoute";
import Admin from "./pages/Admin";
import ImportAssociates from "./components/Associate/Admin/ImportAssociates";
import GiveThanks from "./components/Thanks/GiveThanks";
import Holidays from "./pages/Holidays";
function App() {
  const associatesCollectionRef = collection(db, "Associates");
  const [updateAssociates, setUpdateAssociates] = useState(1);
  const [associates, setAssociates] = useState([]);
  const [allOffices, setOffices] = useState([]);
  const [allDepartments, setDepartments] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toApproveCount, setToApproveCount] = useState();
  const [tasks, setTasks] = useState({});
  const [tasksToApprove, setTaskstoApprove] = useState({});
  const [notifications, setNotifications] = useState([]);

  //
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [isDemo, setIsDemo] = useState();
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    console.log("logout", auth);

    return signOut(auth);
  }

  function resetUserPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(email) {
    return updateEmail(currentUser, email);
  }

  function updateUserPassword(password) {
    return updatePassword(currentUser, password);
  }
  //

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user != null) {
        setIsDemo(user.email === process.env.REACT_APP_DEMO_LOGIN);
        const usersCollectionRef = doc(db, "Users", user.uid);

        getDoc(usersCollectionRef).then((result) => {
          // setUserData(result.data());
          const associatesCollectionRef = doc(
            db,
            "Associates",
            result.data().AssociateID
          );
          getDoc(associatesCollectionRef).then((res) => {
            setUserData({ ...res.data() });
          });
          setIsAdmin(result.data().Role === "Admin");
        });
      }
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    //

    document.title = "HR Core";
    const getAssociates = async () => {
      // const q = query(associatesCollectionRef, orderBy("LastName"));
      // const data = await getDocs(q);
      const data = await getDocs(associatesCollectionRef);
      setAssociates(data.docs.map((user) => ({ ...user.data(), id: user.id })));
    };
    const getOffices = async () => {
      const data = await getDocs(collection(db, "Offices"));
      data.docs.map((office) =>
        setOffices(data.docs.map((office) => office.data().name))
      );
    };
    const getDepartments = async () => {
      const data = await getDocs(collection(db, "Departments"));
      data.docs.map((department) =>
        setDepartments(data.docs.map((department) => department.data().name))
      );
    };

    getAssociates();
    // getTasks();
    getDepartments();
    getOffices();

    // {
    //   userData && userData.AssociateID && getDTDB();
    // }
  }, [updateAssociates, userData]);

  const value = {
    currentUser,
    userData,
    isAdmin,
    isDemo,
    setUserData,
    login,
    signup,
    logout,
    resetUserPassword,
    updateUserEmail,
    updateUserPassword,
  };
  useEffect(() => {
    const getDTDB = () => {
      const dbrt = getDatabase();
      const ChangedRef = ref(dbrt, `Tasks/${userData.id}/MyTasks/`);
      onValue(ChangedRef, (snapshot) => {
        if (snapshot.val() != null) {
          const data = snapshot.val();
          setTasks({ ...data });
        } else {
          setTasks({});
        }
      });
      const refNotifications = query(
        ref(dbrt, `Notifications/${userData.id}`),
        // ref(dbrt, `Notifications/3bOT8x1SBesW3l9jVQmV`),
        limitToFirst(30)
      );
      onValue(refNotifications, (snapshot) => {
        if (snapshot.val() != null) {
          const data = snapshot.val();
          const tempArray = [];

          Object.entries(data).forEach(([key, value]) => {
            // setNotifications([...,{ ...value, id: key }]);
            tempArray.push({ ...value, ID: key });
            // setNotifications((prev) => [...prev, { ...value, id: key }]);
          });
          setNotifications(tempArray);
        } else {
        }
      });
      const ChangedRefApprove = ref(dbrt, `Tasks/${userData.id}/ToApprove/`);
      onValue(ChangedRefApprove, (snapshot) => {
        if (snapshot.val() != null) {
          const data = snapshot.val();
          Object.keys(data).forEach((key, index) => {
            const Taskpath = data[key].TaskPath;
            onValue(ref(dbrt, `Tasks/${Taskpath}`), (snapshot) => {
              if (snapshot.val() != null) {
                const snapp = snapshot.val();
                // setTaskstoApprove((prev) => ({
                //   ...prev,
                //   [index]: { ...snapp, TaskPath: data[key].TaskPath },
                // }));
                setTaskstoApprove((prev) => ({
                  ...prev,
                  [index]: { ...snapp, TaskPath: data[key].TaskPath },
                }));
              }
            });
          });
        } else {
          setTaskstoApprove({});
        }
      });
    };

    userData && getDTDB();
  }, [userData]);

  useEffect(() => {
    tasksToApprove && setToApproveCount(Object.keys(tasksToApprove).length);
  }, [tasksToApprove]);

  return (
    <>
      <AuthContext.Provider value={value}>
        <tasksToApproveContext.Provider
          value={{ toApproveCount, setToApproveCount, tasks, tasksToApprove }}
        >
          <resultsPerPageContext.Provider
            value={{ rowsPerPage, setRowsPerPage }}
          >
            <notificationsContext.Provider
              value={{ notifications, setNotifications }}
            >
              <associatesContext.Provider value={{ associates, setAssociates }}>
                <updateAssociatesContext.Provider
                  value={{ updateAssociates, setUpdateAssociates }}
                >
                  <loadingContext.Provider
                    value={{ loadingProgress, setLoadingProgress }}
                  >
                    <officesContext.Provider value={{ allOffices, setOffices }}>
                      <departmentsContext.Provider
                        value={{ allDepartments, setDepartments }}
                      >
                        <ThemeConfig>
                          <GlobalStyles />
                          <Routes>
                            <Route
                              path="/"
                              element={
                                <PrivateRoute role="Standard">
                                  <DashboardLayout />
                                </PrivateRoute>
                              }
                            >
                              <Route
                                path="/"
                                element={
                                  <PrivateRoute role="Standard">
                                    <Navigate to="/dashboard/home" />
                                  </PrivateRoute>
                                }
                              ></Route>
                              <Route
                                path="dashboard/associates"
                                element={
                                  <PrivateRoute role="Standard">
                                    <Associates />
                                  </PrivateRoute>
                                }
                              ></Route>
                              <Route
                                path="dashboard/associates/:id"
                                element={
                                  <PrivateRoute role="Standard">
                                    <AssociateDetails />
                                  </PrivateRoute>
                                }
                              ></Route>
                              <Route
                                path="dashboard/associates/newassociate"
                                element={
                                  <PrivateRoute role="Standard">
                                    <NewAssociate />
                                  </PrivateRoute>
                                }
                              ></Route>
                              <Route
                                path="dashboard/home"
                                element={
                                  <PrivateRoute role="Standard">
                                    <Home />
                                  </PrivateRoute>
                                }
                              ></Route>
                              <Route
                                exactpath="/"
                                element={
                                  <PrivateRoute role="Standard">
                                    <Home />
                                  </PrivateRoute>
                                }
                              ></Route>
                              <Route
                                path="dashboard/*"
                                element={
                                  <PrivateRoute role="Standard">
                                    <Page404 />
                                  </PrivateRoute>
                                }
                              ></Route>
                              <Route
                                path="dashboard/register"
                                element={
                                  <PrivateRoute role="Admin">
                                    <SignUp />
                                  </PrivateRoute>
                                }
                              ></Route>
                              <Route
                                path="tasks"
                                element={
                                  <PrivateRoute role="Standard">
                                    <MyTasks />
                                  </PrivateRoute>
                                }
                              ></Route>
                              <Route
                                path="thanks"
                                element={
                                  <PrivateRoute role="Standard">
                                    <Thanks />
                                  </PrivateRoute>
                                }
                              ></Route>
                              <Route
                                path="holidays"
                                element={
                                  <PrivateRoute role="Standard">
                                    <Holidays />
                                    {/* <Calendar /> */}
                                  </PrivateRoute>
                                }
                              ></Route>
                              <Route
                                path="dashboard/associates/newassociate"
                                element={
                                  <PrivateRoute role="Standard">
                                    <NewAssociate />
                                  </PrivateRoute>
                                }
                              ></Route>
                              <Route
                                path="thanks/givethanks"
                                element={
                                  <PrivateRoute role="Stabdard">
                                    <GiveThanks />
                                  </PrivateRoute>
                                }
                              />
                              <Route
                                path="admin/database"
                                element={
                                  <PrivateRoute role="Admin">
                                    <Admin />
                                  </PrivateRoute>
                                }
                              ></Route>
                              <Route
                                path="admin/import"
                                element={
                                  <PrivateRoute role="Admin">
                                    <ImportAssociates />
                                  </PrivateRoute>
                                }
                              ></Route>
                            </Route>
                            <Route path="/login" element={<Login />} />
                            <Route path="*" element={<Page404 />} />
                          </Routes>
                        </ThemeConfig>
                      </departmentsContext.Provider>
                    </officesContext.Provider>
                  </loadingContext.Provider>
                </updateAssociatesContext.Provider>
              </associatesContext.Provider>
            </notificationsContext.Provider>
          </resultsPerPageContext.Provider>
        </tasksToApproveContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
