import { useContext } from "react";
import {
  updatedAssociateContext,
  associateContext,
} from "../../../utils/context/contexts";
import { TextField, Button } from "@mui/material";

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
      <TextField
        id="outlined-multiline-flexible"
        label="Notes"
        name="Notes"
        multiline
        defaultValue={associateData.Notes}
        maxRows={8}
        rows={8}
        fullWidth
        onChange={(e) => onUpdate(e)}
      />
    </div>
  );
};

export default AssociateNotes;
