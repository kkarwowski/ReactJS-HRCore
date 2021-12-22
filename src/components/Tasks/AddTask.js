import {
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
  CardHeader,
} from "@mui/material";
import { useState, useContext } from "react";
import { associatesContext } from "../../utils/context/contexts";
import { ref, push } from "firebase/database";
import { rtdb } from "../../utils/firebase";
import ChangeTitleTask from "./addTaskElements/ChangeTitleTask";
import IncreaseSalary from "./addTaskElements/IncreaseSalary";
const AddTask = ({ userDetails, myManager }) => {
  const { associates, setAssociates } = useContext(associatesContext);

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
      approvers: {
        [myManager.id]: {
          status: "pending",
          timestamp: "pending",
        },
        [hrPerson.id]: {
          status: "pending",
          timestamp: "pending",
        },
      },
      requesterName: userDetails.FirstName + " " + userDetails.LastName,
      timestamp: Math.round(new Date().getTime() / 1000),
    });
  };
  const handleValues = (event) => {
    setTaskValues({ ...taskValues, [event.target.name]: event.target.value });
  };
  const writeTask = () => {
    const newTask = push(
      ref(rtdb, `Tasks/${userDetails.id}/MyTasks`),
      taskValues
    );
    // write to each requester in To Approve with path to this specific task
    Object.keys(taskValues.approvers).forEach((approver, index) => {
      push(ref(rtdb, `Tasks/${approver}/ToApprove`), {
        TaskPath: `${taskValues.requester}/MyTasks/${newTask.key}`,
      });
    });
  };

  return (
    <Card>
      <CardHeader title="New Task" />
      <Grid
        container
        direction="column"
        spacing={3}
        sx={{
          p: 3,
          "& .MuiTextField-root": { width: "100%" },
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
            <MenuItem key="2" value="Salary Increase">
              Salary Increase
            </MenuItem>
            <MenuItem key="3" value="Another">
              Another
            </MenuItem>
          </TextField>
        </Grid>

        {show == "Title Change" ? (
          <ChangeTitleTask
            handleValues={handleValues}
            associates={associates}
            myManager={myManager}
            hrPerson={hrPerson}
            writeTask={writeTask}
          />
        ) : null}
        {show == "Salary Increase" ? (
          <IncreaseSalary
            handleValues={handleValues}
            associates={associates}
            myManager={myManager}
            hrPerson={hrPerson}
            writeTask={writeTask}
          />
        ) : null}
      </Grid>
    </Card>
  );
};

export default AddTask;
