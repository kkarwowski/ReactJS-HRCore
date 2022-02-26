import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
const ChangeTitleTask = ({ handleValues, associates, hrPerson, myManager }) => {
  return (
    <>
      <Grid item md={12}>
        <TextField
          label="New Title"
          size="small"
          name="Value"
          onChange={handleValues}
        ></TextField>
      </Grid>
      <Grid item md={12}>
        <TextField
          select
          label="Target Associate"
          size="small"
          name="TargetValue"
          onChange={handleValues}
        >
          {associates
            .sort((a, b) => (a.FirstName > b.FirstName ? 1 : -1))
            .map((associate) => (
              <MenuItem key={associate.id} value={associate.id}>
                {associate.FirstName} {associate.LastName}
              </MenuItem>
            ))}
        </TextField>
      </Grid>
      <Grid item md={12}>
        {myManager && (
          <TextField
            size="small"
            name={"YourManager"}
            label="1st approver - Your Manager"
            disabled={true}
            value={myManager.FirstName + " " + myManager.LastName}
          ></TextField>
        )}
      </Grid>

      <Grid item md={12}>
        <TextField
          fullWidth
          size="small"
          label="2nd Approver - HR Person"
          value={hrPerson.name}
          disabled={true}
        ></TextField>
      </Grid>
      <Grid item md={12}>
        <TextField
          required
          multiline
          rows={3}
          label="Reason"
          size="small"
          name="Reason"
          onChange={handleValues}
        ></TextField>
      </Grid>
    </>
  );
};

export default ChangeTitleTask;
