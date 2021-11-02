import AssociateHeader from "../components/Associate/associateHeader";
import { useEffect, useState, React } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@mui/material"
import { useHistory } from 'react-router-dom';
import { associateContext } from "../utils/context/contexts";
import db from '../utils/firebase'
import {  getDoc, doc} from "firebase/firestore"

const AssociateDetails = () => {
    const {id} = useParams();
    const [associateData, setAssociateData] = useState()
    const history = useHistory()

    useEffect(() => { 
      const getAssociate = async () => {
          const associateFromServer = await fetchDetails()
          setAssociateData({...associateFromServer, id:id})}
      getAssociate();
    },[])
    
    const fetchDetails = async () => {
      const associateCollectionRef = doc(db, "Associates",id)
      const data = await getDoc(associateCollectionRef)
      return data.data()
    }

    const handleBack = () => {
        history.push("/Associates")
    }        

return (
    <>
    <associateContext.Provider value={{associateData,setAssociateData}}>
        <Button variant="contained" size="large" onClick={handleBack} size="medium">Back</Button>
    {associateData && 
      <AssociateHeader />}
    </associateContext.Provider>
</>
)
}

export default AssociateDetails