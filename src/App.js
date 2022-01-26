import "./App.css";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// import Router from "./routes";
import { Routes, Route, Navigate, Redirect } from "react-router-dom";
import {
  associatesContext,
  officesContext,
  updateAssociatesContext,
  loadingContext,
  departmentsContext,
  resultsPerPageContext,
  tasksToApproveContext,
} from "./utils/context/contexts";
import {
  ref,
  on,
  set,
  push,
  onValue,
  onChildAdded,
  get,
  child,
  getDatabase,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
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
import AssociateDetails from "./pages/AssociateDetails";
import NewAssociate from "./components/Associate/newAssociate";
import Page404 from "./pages/Page404";
import SignUp from "./pages/SignUp";
import MyTasks from "./pages/Tasks";
import PrivateRoute from "./pages/PrivateRoute";
import Admin from "./pages/Admin";
import ImportAssociates from "./components/Associate/Admin/ImportAssociates";
import ModifyDatabase from "./components/Associate/Admin/DatabaseModify";
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
      {
        if (user != null) {
          console.log(
            user.email,
            " user email",
            process.env.REACT_APP_DEMO_LOGIN
          );
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
      }
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    //

    console.log("effect for databases!!!!!!");
    document.title = "HR Core";
    const getAssociates = async () => {
      const q = query(associatesCollectionRef, orderBy("LastName"));
      // const data = await getDocs(q);
      const data = await getDocs(associatesCollectionRef);
      setAssociates(data.docs.map((user) => ({ ...user.data(), id: user.id })));
    };
    const getOffices = async () => {
      const data = await getDocs(collection(db, "Offices"));
      console.log("getting offices", data.docs);
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
      const ChangedRefApprove = ref(dbrt, `Tasks/${userData.id}/ToApprove/`);
      onValue(ChangedRefApprove, (snapshot) => {
        if (snapshot.val() != null) {
          const data = snapshot.val();
          Object.keys(data).forEach((key, index) => {
            const Taskpath = data[key].TaskPath;
            onValue(ref(dbrt, `Tasks/${Taskpath}`), (snapshot) => {
              const snapp = snapshot.val();
              setTaskstoApprove((prev) => ({
                ...prev,
                [index]: { ...snapp, TaskPath: data[key].TaskPath },
              }));
            });
          });
        } else {
          setTaskstoApprove({});
        }
      });
    };
    {
      userData && getDTDB();
    }
  }, [userData]);

  useEffect(() => {
    {
      tasksToApprove && setToApproveCount(Object.keys(tasksToApprove).length);
    }
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
                        {/* <Router /> */}
                        <Routes>
                          {/* <Routes> */}
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
                          {/* <Route
                            path="/"
                            element={
                              <PrivateRoute role="Standard">
                                <DashboardLayout />
                              </PrivateRoute>
                            }
                          /> */}
                        </Routes>
                      </ThemeConfig>
                    </departmentsContext.Provider>
                  </officesContext.Provider>
                </loadingContext.Provider>
              </updateAssociatesContext.Provider>
            </associatesContext.Provider>
          </resultsPerPageContext.Provider>
        </tasksToApproveContext.Provider>
        {/* </AuthProvider> */}
      </AuthContext.Provider>
    </>
  );
}

export default App;
