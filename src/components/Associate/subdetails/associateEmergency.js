import {
  Divider,
  Grid,
  Box,
  FormControl,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import {
  associateContext,
  updatedAssociateContext,
} from "../../../utils/context/contexts";
import { useContext, useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import EditIcon from "@mui/icons-material/Edit";

const AssociateEmergencyInfo = ({ updateFirebaseAndState }) => {
  const { associateData } = useContext(associateContext);
  const { updatedAssociate, setUpdatedAssociate } = useContext(
    updatedAssociateContext
  );
  const [emergencyDisabled, setEmergencyDisabled] = useState(true);

  const EditButtonStyles = {
    mt: 2,
    bgcolor: "grey.200",
    border: "2px solid",
    boxShadow: "none",
    // color: postalDisabled || personalDisabled ? "#abb2b9" : "black",
    color: "#abb2b9",
    "&:hover": {
      backgroundColor: "#e6ebf0",
      color: "#4782da",
    },
  };

  const DisabledTextBox = {
    "& .Mui-disabled": {
      opacity: 0.8,
      "-webkit-text-fill-color": "black",
    },
  };

  const onUpdateNested = (event) => {
    setUpdatedAssociate({
      ...updatedAssociate,
      emergencyInfo: {
        ...updatedAssociate.emergencyInfo,
        [event.target.name]: event.target.value,
      },
    });
  };
  const SaveDetails = async () => {
    await updateDoc(doc(db, "Associates", associateData.id), associateData);
  };

  //   const SaveDetails = async (id) => {
  //     const res = await fetch(`http://localhost:5000/associates/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body:JSON.stringify(associateData)
  //     })

  //     console.log(res.status)
  // }
  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   SaveDetails(associateData.id);
  // };

  return (
    <Box sx={{ p: 0, pb: 1 }} dir="ltr">
      <Grid container direction="rows" justifyContent="space-between">
        <Grid item>
          <Typography variant="overline">Emergency Information</Typography>
        </Grid>
        <Grid item>
          <>
            <Button
              sx={EditButtonStyles}
              variant="contained"
              color="primary"
              endIcon={<EditIcon />}
              onClick={() => setEmergencyDisabled((prev) => !prev)}
            >
              Edit
            </Button>
            {!emergencyDisabled && (
              <Button
                sx={{ mt: 2, ml: 2 }}
                variant="contained"
                color="primary"
                onClick={() => updateFirebaseAndState()}
              >
                Save
              </Button>
            )}
          </>
        </Grid>
      </Grid>

      <Divider variant="middle" sx={{ pb: 2 }} />
      <FormControl sx={{ pt: 3 }}>
        {/* <form onSubmit={e =>onSubmit(e)}> */}
        <Grid
          sx={{ p: 1, pb: 5, pt: 2 }}
          container
          columnSpacing={2}
          rowSpacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={4}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="FirstName"
              label="First Name"
              defaultValue={associateData.emergencyInfo.FirstName}
              onChange={(e) => onUpdateNested(e)}
              disabled={emergencyDisabled}
              sx={DisabledTextBox}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="LastName"
              label="Last Name"
              defaultValue={associateData.emergencyInfo.LastName}
              onChange={(e) => onUpdateNested(e)}
              disabled={emergencyDisabled}
              sx={DisabledTextBox}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="Relationship"
              label="Relationship"
              defaultValue={associateData.emergencyInfo.Relationship}
              onChange={(e) => onUpdateNested(e)}
              disabled={emergencyDisabled}
              sx={DisabledTextBox}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="TelephoneNumber"
              label="Telephone Nummber"
              defaultValue={associateData.emergencyInfo.TelephoneNumber}
              onChange={(e) => onUpdateNested(e)}
              disabled={emergencyDisabled}
              sx={DisabledTextBox}
            />
          </Grid>
        </Grid>
        {/* </form> */}
      </FormControl>
    </Box>
  );
};

export default AssociateEmergencyInfo;
