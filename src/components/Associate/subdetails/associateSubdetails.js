import Box from '@mui/material/Box';
import { Grid, Avatar, AvatarGroup, Stack } from '@mui/material';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DataFromFirebase from '../../../utils/dataFromFirebase'
import { useState, useEffect, useContext } from 'react';
import { getDocs, where, query, collection ,doc, getDoc} from "firebase/firestore"
import db from '../../../utils/firebase'
import { associateContext } from '../../../utils/context/contexts';


const AssociateSubdetails = () => { 
  
  const {associateData, setAssociateData} = useContext(associateContext)
   const [managerDetails, setManagerDetails] = useState()
   const [TeamMembers, setTeamMembers] = useState([])
   
   const fetchTeamMembers = async () => {
       const associateCollectionRef = collection(db, "Associates")
       const q = query(associateCollectionRef, where("Department", "==", associateData.Department));
       const thedata = await getDocs(q)
       const TempMembers = []
      thedata.forEach((doc) => {
        if(associateData.id!==doc.id){
          TempMembers.push(doc.data())
          }
      });
      return TempMembers
   }
   const fetchManager = async (ID) => {
    const associateCollectionRef = doc(db, "Associates",ID)
    const thedata = await getDoc(associateCollectionRef)
    return thedata.data()
   }

   useEffect(() => { 
   const getMembers = async () => {
       const associateFromServer = await fetchTeamMembers()
       setTeamMembers(associateFromServer)
       const managerFromServer = await fetchManager(associateData.Manager)
       setManagerDetails(managerFromServer)
  }
   getMembers();
   },[])
  
  
  return (


<>    
{/* {loadingManager && <Stack direction="row" alignItems="center" justifyContent="center" mb={5}><CircularProgress/></Stack> } */}

{ managerDetails && TeamMembers &&

        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 0,
              pr:0,
            //   width: 400,
            //   height: 400,
            },
          }}>

      <Box sx={{ p: 1, pr: 1 }} dir="ltr">
        
        <Grid container
            direction="column"
            justifyContent="space-around"
            alignItems="flex-start">
                <Grid item xs={12} sx={{pb:1}}>
                  <Grid container
                  columnSpacing={2}
                  direction="rows"
                  justifyContent="flex-start"
                  alignItems="center">
                    <Grid Item xs={12} sx={{pr:2, pl:3, pb:1}}>
                        <Typography variant="overline">
                        Manager
                        </Typography>                   
                      </Grid>
                        <Grid container
                        direction="rows"
                        justifyContent="space-around"
                        alignItems="center">
                          <Grid Item xs={2} sx={{pr:2, pl:1}}>
                              <Avatar src={managerDetails.profilePicture} alt="Profile Pic"  sx={{ width: 60, height: 60 }} /> 
                          </Grid>
                          <Grid Item xs={8} sx={{pr:2, pl:3}}>
                              <Typography variant="h6">
                                {managerDetails.FirstName} {managerDetails.LastName} 
                              </Typography>
                              <Typography variant="h7">
                              
                            {managerDetails.Title}
                            </Typography>
                          </Grid>
                          </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{pt:5, pl:1, pb:1}} >
                <Typography variant="overline">
                  Team Members
                  </Typography>
                  <Grid container alignItems="flex-start">
                    <Grid Item>
                    <AvatarGroup sx={{pb:1,pt:2}} max={6} >
                      {TeamMembers.map((FilteredMember)=>{
                        if(!(FilteredMember.id==associateData.id))
                        return(
                        <Avatar name={FilteredMember.FirstName} src={FilteredMember.profilePicture} />
                        )
                      })}
                    </AvatarGroup>
                    </Grid>
                  </Grid>
              </Grid>
          </Grid>
      </Box>
        </Box>
}
</>
    )
}

export default AssociateSubdetails