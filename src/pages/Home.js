import React , {useEffect, useState } from "react";
import { Grid, Container, Typography,Button} from '@mui/material';
import { useQuery } from "react-query";

// import associatesjson from "../Offices.json"
import { collection, getDocs, addDoc} from "firebase/firestore"
// import { AssociatesService } from "../utils/DatabseServices";
import db from "../utils/firebase"
import { DataUsageRounded } from "@mui/icons-material";
// import OfficeGraph from "../_dashboard/stats/officeGraph";
// import DepartmentGraph from "../_dashboard/stats/departmentGraph";
// import TotalEmployed from "../_dashboard/stats/TotalEmployed";
const userCollectionRef = collection(db, "Offices")

const Home = () => {
const [associates, setAssociates] = useState([])

useEffect(() => {
  const getAssociates = async () => {
    const data = await getDocs(collection(db, "Associates"))
    console.log(data)
    setAssociates(data.docs.map((user) => ({...user.data(), id: user.id})))
  }
  getAssociates()
  console.log("ass", associates)
}, [])

// const ggg = ()=>{
//   associatesjson.forEach(element => {
//   AddDoc(element)
//     console.log("wrote ",element )
//   });
//   } 


// const ggg = (list1)=>{
// list1.forEach(element => {
// AddDoc(element)
//   console.log("wrote ",element )
// });
// } 
const AddDoc = async (associate1) => await addDoc(userCollectionRef, associate1)

return (
  
    <Container maxWidth="xl">
      <Typography variant="h3" pt={8} pb={5}>Hi, Welcome back</Typography>
      <Grid  container spacing={3}>
        {/* <Grid Grid item xs={12} sm={6} md={3}>
          <TotalEmployed/>
        </Grid>
        <Grid Grid item xs={12} sm={6} md={3}>
          <TotalEmployed/>
        </Grid>
        <Grid Grid item xs={12} sm={6} md={3}>
          <TotalEmployed/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OfficeGraph/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DepartmentGraph/>
        </Grid> */}
        <Grid item xs={12} md={6} lg={4}>
          <Button variant="contained" >Upload</Button>
        </Grid>
        <Grid Item>
        { associates.map((associate) => {
          {console.log(associate)}
          return (
          <Typography>
            {associate.FirstName} { associate.id}
          </Typography>)
        })}
        </Grid>
    </Grid>
   </Container>
)
}

export default Home