import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import { Typography } from "@mui/material";
import PermanentDrawerLeft from "./components/Nav/drawer";
import {
  associatesContext,
  officesContext,
  updateAssociatesContext,
  loadingContext,
} from "./utils/context/contexts";
import { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "./utils/firebase";

function App() {
  const associatesCollectionRef = collection(db, "Associates");
  const [updateAssociates, setUpdateAssociates] = useState(1);
  const [associates, setAssociates] = useState([]);
  const [allOffices, setOffices] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(null);

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
      getAssociates();
      getOffices();
      console.log("useEffect");
    },
    [updateAssociates]
  );

  return (
    <>
      <associatesContext.Provider value={{ associates, setAssociates }}>
        <updateAssociatesContext.Provider
          value={{ updateAssociates, setUpdateAssociates }}
        >
          <loadingContext.Provider
            value={{ loadingProgress, setLoadingProgress }}
          >
            <officesContext.Provider value={{ allOffices, setOffices }}>
              <ThemeConfig>
                <GlobalStyles />
                <Typography variant="h2">Hello</Typography>
                <PermanentDrawerLeft />
              </ThemeConfig>
            </officesContext.Provider>
          </loadingContext.Provider>
        </updateAssociatesContext.Provider>
      </associatesContext.Provider>
    </>
  );
}

export default App;
