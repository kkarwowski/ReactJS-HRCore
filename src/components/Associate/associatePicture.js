import Label from '../Label'
import Box from '@mui/material/Box';
import { Grid, Card, CardHeader, Avatar } from '@mui/material';
import { sentenceCase } from 'change-case';
// import profilePicSample from '../../profilePicSample.jpg' // relative path to image 

const AssociatePic = (props) => { 
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
        <Avatar src={props.UserPicture} alt="Profile Pic"  sx={{ width: 250, height: 250 }} />    
      <div className='.crop-container'>
      {/* <img src={`data:image/png;base64,${props.UserPicture}`} className='avatar-crop'/> */}
      </div>
      </Box>
        </Box>
    )
}

export default AssociatePic