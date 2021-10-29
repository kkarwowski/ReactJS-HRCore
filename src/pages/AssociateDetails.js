import AssociateHeader from "../components/Associate/associateHeader";
import { useEffect, useState, React } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@mui/material"
import { useHistory } from 'react-router-dom';
import { associateContext } from "../utils/context/contexts";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import db from '../utils/firebase'
import {  getDoc, doc} from "firebase/firestore"


const AssociateDetails = () => {
    // const [alert, setAlert] = useState({
    //     open: false,
    //     vertical: '',
    //     horizontal: '',
    //   }); 
    // const { vertical, horizontal, open } = alert;

    const {id} = useParams();
    const [associateData, setAssociateData] = useState()
    const history = useHistory()

    useEffect(() => { 
      const getAssociate = async () => {
          const associateFromServer = await fetchDetails()
          setAssociateData(associateFromServer)}
      getAssociate();
      console.log("assocaite",associateData)
    },[])
    
    // const handleClose = () => {
    //     setAlert({ ...alert, open: false });
    //   };
    //   const handleClick = (newState) => () => {
    //     setAlert({ open: true, ...newState });
    //   };
    const fetchDetails = async () => {
      const associateCollectionRef = doc(db, "Associates",id)
      const data = await getDoc(associateCollectionRef)
      console.log("id",data)
      return data.data()
    }

    const handleBack = () => {
        history.push("/Associates")
    }        

return (
    <>
    <associateContext.Provider value={{associateData,setAssociateData}}>
    <br></br>
    <br></br>
    <br></br>
    {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
        autoHideDuration={6000}>
        <Alert onClose={handleClose} severity="success" >
    Changes Saved!
  </Alert>
 
  </Snackbar> */}
        <Button variant="contained" size="large" onClick={handleBack}>Back</Button>
        {/* <Button
            onClick={handleClick({
              vertical: 'top',
              horizontal: 'right',
            })}
          >
            Top-Right
          </Button> */}
    {associateData && <AssociateHeader />}
    </associateContext.Provider>
</>
)
}

export default AssociateDetails