import { Button, Card, Grid, MenuItem, TextField } from "@mui/material";
import { useState, useContext } from "react";
import { Box } from "@mui/system";
import { associatesContext } from "../../utils/context/contexts";
import { useAuth } from "../../utils/context/AuthContext";

const AddTask = () => {
  const { userData } = useAuth();
  const { associates, setAssociates } = useContext(associatesContext);
  const [myUserDetails, setMyUserDetails] = useState();

  const [myManagerDetails, setMyManagerDetails] = useState();

  const hrPerson = {
    name: "Marco Casper",
    id: "4U1DWf95rJvgfAwDYs7m",
  };
  setMyUserDetails(
    associates.filter((associate) => associate.id === userData.id)
  );

  {
    myUserDetails &&
      setMyManagerDetails(
        associates.filter((associate) => associate.id === myUserDetails.Manager)
      );
  }
  const [show, setShow] = useState();
  const [taskValues, setTaskValues] = useState();
  const handleChange = (event) => {
    setShow(event.target.value);
    setTaskValues({ ...taskValues, TaskName: event.target.value });
  };
  const handleValues = (event) => {
    setTaskValues({ ...taskValues, [event.target.name]: event.target.value });
    setTaskValues({ ...taskValues, hrPerson: hrPerson.id });
  };
  return (
    <Card>
      <Grid
        container
        direction="column"
        sx={{
          p: 3,
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <Grid item md={12}>
          <TextField select label="Type" size="small" onChange={handleChange}>
            <MenuItem key="1" value="TitleChange" name="TitleChange">
              Title Change
            </MenuItem>
            <MenuItem key="w" value="Another">
              Another
            </MenuItem>
          </TextField>
          {show == "TitleChange" ? (
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
                  onChange={handleChange}
                >
                  {associates.map((associate) => (
                    <MenuItem key={associate.id} value={associate.id}>
                      {associate.FirstName} {associate.LastName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={12}>
                <TextField
                  name={"YourManager"}
                  label="Your Manager"
                  disabled={true}
                  value={associates && myManagerDetails.FirstName}
                ></TextField>
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="HR Person"
                  value={hrPerson.name}
                  disabled={true}
                ></TextField>
              </Grid>
            </>
          ) : null}
        </Grid>
      </Grid>
      <Button
        onClick={() => {
          console.log(taskValues, userData);
        }}
      >
        Log
      </Button>
    </Card>
  );
};

export default AddTask;
