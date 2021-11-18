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
} from "./utils/context/contexts";
import { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./utils/firebase";
import { AuthProvider } from "./utils/context/AuthContext";
function App() {
  const associatesCollectionRef = collection(db, "Associates");
  const [updateAssociates, setUpdateAssociates] = useState(1);
  const [associates, setAssociates] = useState([]);
  const [allOffices, setOffices] = useState([]);
  const [allDepartments, setDepartments] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  useEffect(
    (associateCollectionRef) => {
      document.title = "HR Core";
      const getAssociates = async () => {
        const data = await getDocs(associatesCollectionRef);
        setAssociates(
          data.docs.map((user) => ({ ...user.data(), id: user.id }))
        );
      };
      const getOffices = async () => {
        const data = await getDocs(collection(db, "Offices"));
        data.docs.map((office) =>
          setOffices(data.docs.map((office) => [office.data().name]))
        );
      };
      const getDepartments = async () => {
        const data = await getDocs(collection(db, "Departments"));
        data.docs.map((department) =>
          setDepartments(
            data.docs.map((department) => [department.data().name])
          )
        );
      };
      getAssociates();
      getDepartments();
      getOffices();
      console.log("useEffect");
    },
    [updateAssociates]
  );

  return (
    <>
      <AuthProvider>
        <resultsPerPageContext.Provider value={{ rowsPerPage, setRowsPerPage }}>
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
      </AuthProvider>
    </>
  );
}

export default App;
