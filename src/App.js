import "./App.css";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import Router from "./routes";
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
import { rtdb } from "./utils/firebase";
import React, { useEffect, useState, useContext } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  getDoc,
  doc,
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
function App() {
  const associatesCollectionRef = collection(db, "Associates");
  const [updateAssociates, setUpdateAssociates] = useState(1);
  const [associates, setAssociates] = useState([]);
  const [allOffices, setOffices] = useState([]);
  const [allDepartments, setDepartments] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toApproveCount, setToApproveCount] = useState();
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
    //
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      {
        if (user != null) {
          setIsDemo(user.email === "demo@hr-core.netlify.app");
          const usersCollectionRef = doc(db, "Users", user.uid);

          getDoc(usersCollectionRef).then((result) => {
            setUserData(result.data());
            setIsAdmin(result.data().Role === "Admin");
          });
        }
      }
    });
    //
    document.title = "HR Core";
    const getAssociates = async () => {
      const q = query(associatesCollectionRef, orderBy("LastName"));
      // const data = await getDocs(q);
      const data = await getDocs(associatesCollectionRef);
      setAssociates(data.docs.map((user) => ({ ...user.data(), id: user.id })));
      console.log(userData);
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

    // const getTasks = () => {
    //   const tasksRef = ref(rtdb, "Tasks");
    //   // const tasksRef = ref(getDatabase());

    //   // onChildAdded(tasksRef, (data) => {
    //   //   // tasks.push(data.val());
    //   //   console.log("value", data.val());
    //   // });
    //   onValue(tasksRef, (snapshot) => {
    //     const data = snapshot.val();
    //     console.log(data.name);
    //     setTasks(data.name);
    //   });
    //   // get(child(tasksRef, `Tasks/`))
    //   //   .then((snapshot) => {
    //   //     if (snapshot.exists()) {
    //   //       console.log("val", snapshot.val());
    //   //       snapshot.map((f) => {
    //   //         console.log(f);
    //   //       });
    //   //     } else {
    //   //       console.log("No data available");
    //   //     }
    //   //   })
    //   //   .catch((error) => {
    //   //     console.error(error);
    //   //   });
    // };
    getAssociates();
    // getTasks();
    getDepartments();
    getOffices();
    return unsubscribe;
  }, [updateAssociates]);
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

  return (
    <>
      {/* <AuthProvider> */}
      <AuthContext.Provider value={value}>
        <tasksToApproveContext.Provider
          value={{ toApproveCount, setToApproveCount }}
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
                        <Router />
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
