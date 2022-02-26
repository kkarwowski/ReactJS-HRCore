import { useContext, useState } from "react";
import {
  updatedAssociateContext,
  associateContext,
} from "../../../utils/context/contexts";
import { TextField, Grid, Box, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const AssociateNotes = ({ updateFirebaseAndState }) => {
  const { updatedAssociate, setUpdatedAssociate } = useContext(
    updatedAssociateContext
  );
  const { associateData } = useContext(associateContext);
  const [notesDisabled, setNotesDisabled] = useState(true);

  const onUpdate = (event) => {
    setUpdatedAssociate({
      ...updatedAssociate,
      [event.target.name]: event.target.value,
    });
  };
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

  // const DisabledTextBox = {
  //   "& .Mui-disabled": {
  //     opacity: 0.8,
  //     "-webkit-text-fill-color": "black",
  //   },
  // };
  return (
    <div>
      <Box sx={{ p: 0, pb: 1 }} dir="ltr">
        <Grid container direction="rows" justifyContent="space-between">
          <Grid item>
            <Typography variant="overline">Associate Notes</Typography>
          </Grid>
          <Grid item>
            <Button
              sx={EditButtonStyles}
              variant="contained"
              color="primary"
              endIcon={<EditIcon />}
              onClick={() => setNotesDisabled((prev) => !prev)}
            >
              Edit
            </Button>
            {!notesDisabled && (
              <Button
                sx={{ mt: 2, ml: 2 }}
                variant="contained"
                color="primary"
                onClick={() => updateFirebaseAndState()}
              >
                Save
              </Button>
            )}
          </Grid>
        </Grid>

        <TextField
          id="outlined-multiline-flexible"
          label="Notes"
          name="Notes"
          multiline
          defaultValue={associateData.Notes}
          // maxRows={30}
          rows={15}
          fullWidth
          onChange={(e) => onUpdate(e)}
          sx={{ mt: 2 }}
        />
      </Box>
    </div>
  );
};

export default AssociateNotes;
