import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Cropper from "react-easy-crop";
import Slider from '@mui/material/Slider';
import styles from '../../src/uploaderCSS.css'
// import { dataURLtoFile } from '../utils/URLtoFILE';

import { generateDownload } from "../utils/cropImage";
import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "30vw",
    height: "60vh",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Upload = () => {
const [image, setImage] = React.useState(null);
  const Input = styled('input')({
    display: 'none',
    });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setImage(null)
  };

  const inputRef = React.useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

  
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  
  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
    };

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            
            reader.addEventListener("load", () => {
                setImage(reader.result);
            });
        }
    };
    const onDownload = async () => {
        const result = await generateDownload(image, croppedArea)
		console.log("result", result);
		// getCroppedImg(image, croppedArea,);

	};
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Upload Image</Button>
      <label htmlFor="icon-button-file">
    <Input accept="image/*" id="icon-button-file" type="file" />
    <IconButton color="primary" aria-label="upload picture" component="span">
        <Avatar src={"dfdfdf"}/>
    </IconButton>
    </label>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
              <div className="styles.container">
              <div className='container-cropper'>
				{image ? (
					<>
						<div className='styles.cropper'>
							<Cropper
								image={image}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
							/>
						</div>
					</>
				) : null}
			</div>
            <div className='slider'>
                <Slider
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e, zoom) => setZoom(zoom)}/>
			</div>
            <div className="container-buttons">
                  <input type="file" accept="image/*" ref={inputRef}
					onChange={onSelectFile}
					style={{ display: "none" }}/>
                      <Button variant="contained" onClick={triggerFileSelectPopup}>Choose File</Button>
                      <Button variant="contained"onClick={onDownload}>Upload</Button>

            </div>
                  </div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
    }
export default Upload