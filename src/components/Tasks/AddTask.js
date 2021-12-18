import {
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
  CardHeader,
  CardContent,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Box } from "@mui/system";
import {
  associatesContext,
  myDetailsContext,
} from "../../utils/context/contexts";
import { useAuth } from "../../utils/context/AuthContext";
import { ref, push } from "firebase/database";
import { rtdb } from "../../utils/firebase";
const AddTask = ({ userDetails, myManager }) => {
  // const { myDetails, setMyDetails } = useContext(myDetailsContext);
  const { associates, setAssociates } = useContext(associatesContext);
  const [myManagerDetails, setMyManagerDetails] = useState();
  const { userData } = useAuth();

  const hrPerson = {
    id: "4U1DWf95rJvgfAwDYs7m",
  };

  const [show, setShow] = useState();
  const [taskValues, setTaskValues] = useState({});

  const handleChangeSelectTask = (event) => {
    setShow(event.target.value);
    setTaskValues({
      ...taskValues,
      status: "pending",
      TaskName: event.target.value,
      requester: userDetails.id,
      approvers: [
        {
          approverID: myManager.id,
          status: "pending",
        },
        {
          approverID: hrPerson.id,
          status: "pending",
        },
      ],
      requesterName: userDetails.FirstName + " " + userDetails.LastName,
      timestamp: Date.now(),
    });
  };
  const handleValues = (event) => {
    setTaskValues({ ...taskValues, [event.target.name]: event.target.value });
    // setTaskValues({ ...taskValues, hrPerson: hrPerson.id });
  };
  const writeTask = () => {
    push(ref(rtdb, "Tasks/3bOT8x1SBesW3l9jVQmV"), taskValues);
  };

  return (
    <Card>
      <CardHeader title="New Task" />
      <Grid
        container
        direction="column"
        spacing={1}
        sx={{
          p: 3,
          "& .MuiTextField-root": { m: 1, width: "35ch" },
        }}
      >
        <Grid item md={12}>
          <TextField
            name=""
            select
            label="Type"
            size="small"
            onChange={handleChangeSelectTask}
          >
            <MenuItem key="1" value="Title Change">
              Title Change
            </MenuItem>
            <MenuItem key="w" value="Another">
              Another
            </MenuItem>
          </TextField>
        </Grid>

        {show == "Title Change" ? (
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
                {associates.map((associate) => (
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
                size="small"
                label="2nd Approver - HR Person"
                value={hrPerson.name}
                disabled={true}
              ></TextField>
            </Grid>
            <Grid item md={12}>
              <Button fullWidth variant="contained" onClick={writeTask}>
                Submit
              </Button>
            </Grid>
          </>
        ) : null}
      </Grid>
      <Button
        onClick={() => {
          console.log(taskValues);
        }}
      >
        Log
      </Button>
    </Card>
  );
};

export default AddTask;
