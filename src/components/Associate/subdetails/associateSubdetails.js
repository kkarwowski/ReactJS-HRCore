
import Box from '@mui/material/Box';
import { Grid, Avatar, AvatarGroup, Stack } from '@mui/material';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DataFromFirebase from '../../../utils/dataFromFirebase'
import { useState, useEffect } from 'react';
import { getDocs, where, query, collection} from "firebase/firestore"
import db from '../../../utils/firebase'


const AssociateSubdetails = (props) => { 
  // const {data: TeamMembers, error:errorTeams, loading:loadingTeam} = useFetch(`http://localhost:5000/associates?Department=${props.Department}&_embed=pictures`)
  
  // const {data: ManagerDetails,  loading:loadingManager} = useFetch(`http://localhost:5000/associates/${props.ManagerID}?_embed=pictures`)
   const {data: managerDetails} = DataFromFirebase(props.ManagerID)
   const [TeamMembers, setTeamMembers] = useState([])
   
   const fetchDetails = async () => {
    console.log("id", props.UserID)
       const associateCollectionRef = collection(db, "Associates")
       const q = query(associateCollectionRef, where("Department", "==", props.Department));
       const thedata = await getDocs(q)
       console.log("team members",thedata)
       const TempManagers = []
      //  return thedata.data()
      thedata.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().FirstName);
       
        if(props.UserID!==doc.id){
          TempManagers.push(doc.data())
          }
      });
      return TempManagers

   }
   useEffect(() => { 
   const getManager = async () => {
       const associateFromServer = await fetchDetails()
       setTeamMembers(associateFromServer)}
   getManager();
   console.log("sdsd",TeamMembers)
   },[])
  
  
  return (


<>    
{/* {loadingManager && <Stack direction="row" alignItems="center" justifyContent="center" mb={5}><CircularProgress/></Stack> } */}

{/* { ManagerDetails && TeamMembers && */}
{ managerDetails &&
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
                              {/* <Avatar src={`data:image/png;base64,${ManagerDetails.pictures.map((pic,i) => (pic.largePicture))}`} alt="Profile Pic"  sx={{ width: 60, height: 60 }} />  */}
                          </Grid>
                          <Grid Item xs={8} sx={{pr:2, pl:3}}>
                              <Typography variant="h6">
                                {managerDetails.FirstName} {managerDetails.LastName} 
                              </Typography>
                            {managerDetails.Title}
                  
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
                    {/* <AvatarGroup sx={{pb:1,pt:2}} max={6} >
                      {TeamMembers.map((FilteredMember)=>{
                        if(!(FilteredMember.id==props.UserID))
                        return(
                        <Avatar name="sdfgd" src={`data:image/png;base64,${FilteredMember.pictures.map((pic,i) => (pic.largePicture))}`} />
                        )
                      })}
                    </AvatarGroup> */}
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