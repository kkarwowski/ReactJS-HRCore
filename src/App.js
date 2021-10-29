import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import { Typography } from '@mui/material';
import PermanentDrawerLeft from './components/Nav/drawer';
import { associatesContext } from './utils/context/contexts';
import {useEffect, useState} from 'react'
import { collection, getDocs, addDoc} from "firebase/firestore"
import db from "./utils/firebase"

function App() {
  const associatesCollectionRef = collection(db, "Associates")
  const [associates, setAssociates] = useState([])

  useEffect(() => {
    const getAssociates = async () => {
      const data = await getDocs(associatesCollectionRef)
      setAssociates(data.docs.map((user) => ({...user.data(), id: user.id})))
    }
    getAssociates()
  }, [])
  
  return (
    <>
      <associatesContext.Provider value={{associates, setAssociates}}>
    <ThemeConfig>
      <GlobalStyles />
      <Typography variant="h2">Hello</Typography>
      <PermanentDrawerLeft/>
    </ThemeConfig>
    </associatesContext.Provider>
    </>
  );
}

export default App;
