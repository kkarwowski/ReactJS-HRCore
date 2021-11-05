import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import { Typography } from "@mui/material";
import PermanentDrawerLeft from "./components/Nav/drawer";
import { associatesContext, officesContext } from "./utils/context/contexts";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "./utils/firebase";

function App() {
  const associatesCollectionRef = collection(db, "Associates");

  const [associates, setAssociates] = useState([]);
  const [allOffices, setOffices] = useState([]);

  useEffect((associateCollectionRef) => {
    document.title = "HR Core";
    const getAssociates = async () => {
      const data = await getDocs(associatesCollectionRef);
      setAssociates(data.docs.map((user) => ({ ...user.data(), id: user.id })));
    };
    const getOffices = async () => {
      const data = await getDocs(collection(db, "Offices"));
      console.log(data.docs);
      data.docs.map((office) => console.log(office.data().name));
      setOffices(data.docs.map((office) => [office.data().name]));
    };
    getAssociates();
    getOffices();
  }, []);

  return (
    <>
      <associatesContext.Provider value={{ associates, setAssociates }}>
        <officesContext.Provider value={{ allOffices, setOffices }}>
          <ThemeConfig>
            <GlobalStyles />
            <Typography variant="h2">Hello</Typography>
            <PermanentDrawerLeft />
          </ThemeConfig>
        </officesContext.Provider>
      </associatesContext.Provider>
    </>
  );
}

export default App;
