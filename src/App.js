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
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./utils/firebase";
import { AuthProvider } from "./utils/context/AuthContext";
function App() {
  const associatesCollectionRef = collection(db, "Associates");
  const [updateAssociates, setUpdateAssociates] = useState(1);
  const [associates, setAssociates] = useState([]);
  const [allOffices, setOffices] = useState([]);
  const [allDepartments, setDepartments] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toApproveCount, setToApproveCount] = useState();
  useEffect(() => {
    document.title = "HR Core";
    const getAssociates = async () => {
      const q = query(associatesCollectionRef, orderBy("LastName"));
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
  }, [updateAssociates]);

  return (
    <>
      <AuthProvider>
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
      </AuthProvider>
    </>
  );
}

export default App;
