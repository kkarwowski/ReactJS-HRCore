import Box from "@mui/material/Box";
import { IconButton, Grid } from "@mui/material";
import * as React from "react";
import { useContext, useState, useRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import { generateCropFile } from "../../utils/cropImage";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../utils/context/AuthContext";

import ResponsiveAvatar from "./ResponsiveAvatar";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import {
  associateContext,
  updateAssociatesContext,
} from "../../utils/context/contexts";
import { db } from "../../utils/firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  height: "90vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AssociatePic = () => {
  const { setUpdateAssociates } = useContext(updateAssociatesContext);
  const { associateData, setAssociateData } = useContext(associateContext);
  const { isDemo } = useAuth();

  const updateProfileURL = async (url) => {
    const associateCollectionRef = doc(db, "Associates", associateData.id);
    await updateDoc(associateCollectionRef, {
      profilePicture: url,
    });
  };

  const UploadToFirebase = (image) => {
    const storage = getStorage();
    const storageRef = ref(storage, `associateImages/${associateData.id}.jpg`);
    uploadString(storageRef, image.split(",")[1], "base64").then(() => {
      getDownloadURL(ref(storageRef)).then((url) => {
        setAssociateData({ ...associateData, profilePicture: url });
        updateProfileURL(url);
        setUpdateAssociates((updateAssociates) => updateAssociates + 1);
      });
    });
  };

  const [image, setImage] = useState(null);
  const Input = styled("input")({
    display: "none",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImage(null);
    setZoom(null);
  };

  const inputRef = useRef();
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    handleOpen();
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const onUpload = async () => {
    const result = await generateCropFile(image, croppedArea);
    UploadToFirebase(result);
    handleClose();
  };

  return (
    <Grid container direction="row" alignItems="center" justifyContent="center">
      <Grid item xs={12} lg={12}>
        <Box sx={{ p: 0 }} dir="ltr">
          <label htmlFor="icon-button-file">
            {!isDemo && (
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                ref={inputRef}
                onChange={onSelectFile}
              />
            )}
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <ResponsiveAvatar
                src={associateData.profilePicture}
                className={".crop-container"}
              />
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
                  {!isDemo && (
                    <div className="styles.container-cropper">
                      {image ? (
                        <>
                          <div className="styles.cropper">
                            <Cropper
                              image={image}
                              crop={crop}
                              zoom={zoom}
                              aspect={1}
                              onCropChange={setCrop}
                              onZoomChange={setZoom}
                              onCropComplete={onCropComplete}
                              cropShape="round"
                            />
                          </div>
                        </>
                      ) : null}
                    </div>
                  )}
                  {image && (
                    <div className="slider">
                      <Slider
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e, zoom) => setZoom(zoom)}
                      />
                    </div>
                  )}
                  <div className="container-buttons">
                    {image && (
                      <Button variant="contained" onClick={onUpload}>
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  {/* Text in a modal */}
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AssociatePic;
