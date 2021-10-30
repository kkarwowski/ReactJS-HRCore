import { getDoc, doc} from "firebase/firestore"
import { useState, useEffect } from 'react';
import db from '../utils/firebase'

const DataFromFirebase = async (ID) => {
    const [data, setData] = useState()
    const fetchDetails = async () => {
        const associateCollectionRef = doc(db, "Associates",ID)
        const thedata = await getDoc(associateCollectionRef)
        console.log("Managers is :=> ",thedata.data())
        return thedata.data()
    }
    useEffect(() => { 
    const getManager = async () => {
        const associateFromServer = await fetchDetails()
        setData(associateFromServer)}
    getManager();
    },[])

  return { data }
  
}

export default DataFromFirebase