import Box from '@mui/material/Box';
import { Avatar, IconButton } from '@mui/material';
import * as React from 'react';
import { useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Cropper from "react-easy-crop";
import Slider from '@mui/material/Slider';
import styles from '../../uploaderCSS.css'
import { generateCropFile } from "../../utils/cropImage";
import { styled } from '@mui/material/styles';
import { getStorage, ref, uploadString, getDownloadURL} from "firebase/storage";
import { associateContext } from "../../utils/context/contexts";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60vw",
  height: "90vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const AssociatePic = () => { 
  const {associateData, setAssociateData} = useContext(associateContext)

  const UploadToFirebase = (testimage) =>{
    const storage = getStorage();
    const storageRef = ref(storage, `associateImages/${associateData.ID}.jpg`);
    uploadString(storageRef, testimage.split(',')[1],'base64').then(() => {
      console.log('Uploaded a blob or file!');
      getDownloadURL(ref(storageRef)).then((url) => {

      //   await updateDoc(frankDocRef, {
      //     "age": 13,
      //     "favorites.color": "Red"
      // });
      })
  })
  }






    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              pr:2,
              pl:3,
            //   width: 400,
            //   height: 400,
            },
          }}>
      <Box sx={{ p: 0, pr: 1 }} dir="ltr">
        {/* <Avatar src={`data:image/png;base64,${props.UserPicture}`} alt="Profile Pic"  sx={{ width: 250, height: 250 }} />     */}
    <IconButton color="primary" aria-label="upload picture" component="span" >
        <Avatar src={associateData.profilePicture}  sx={{ width: 250, height: 250 }} className='.crop-container'/>    
    </IconButton>
      {/* <div className='.crop-container'> */}
      {/* <img src={`data:image/png;base64,${props.UserPicture}`} className='avatar-crop'/> */}
      {/* </div> */}
      </Box>
        </Box>
    )
}

export default AssociatePic