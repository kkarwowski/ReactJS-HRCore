import { useContext } from "react";
import {
  updatedAssociateContext,
  associateContext,
} from "../../../utils/context/contexts";
import { TextField, Grid, Box, Typography } from "@mui/material";

const AssociateNotes = () => {
  const { updatedAssociate, setUpdatedAssociate } = useContext(
    updatedAssociateContext
  );
  const { associateData, setAssociateData } = useContext(associateContext);

  const onUpdate = (event) => {
    setUpdatedAssociate({
      ...updatedAssociate,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Box sx={{ p: 0, pb: 1 }} dir="ltr">
        <Typography variant="overline">Changes</Typography>
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
