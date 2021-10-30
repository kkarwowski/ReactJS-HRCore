import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import { Typography } from '@mui/material';
import PermanentDrawerLeft from './components/Nav/drawer';
import { associatesContext, officesContext } from './utils/context/contexts';
import {useEffect, useState} from 'react'
import { collection, getDocs, addDoc} from "firebase/firestore"
import db from "./utils/firebase"

function App() {
  const associatesCollectionRef = collection(db, "Associates")
  const [associates, setAssociates] = useState([])
  const [allOffices, setOffices] = useState()

  useEffect(() => {
    document.title = "HR Core";  
    const getAssociates = async () => {
      const data = await getDocs(associatesCollectionRef)
      setAssociates(data.docs.map((user) => ({...user.data(), id: user.id})))
    }
    getAssociates()
  }, [])
  
  useEffect(() => {
    const getOffices = async () => {
      const data = await getDocs(collection(db, "Offices"))
      setOffices(data)
    }
    getOffices()
  }, [])

  return (
    <>
    
      <associatesContext.Provider value={{associates, setAssociates}}>
      <officesContext.Provider value={allOffices,setOffices}>
    <ThemeConfig>
      <GlobalStyles />
      <Typography variant="h2">Hello</Typography>
      <PermanentDrawerLeft/>
    </ThemeConfig>
    </officesContext.Provider>
    </associatesContext.Provider>
    </>
  );
}

export default App;
