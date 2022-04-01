import { Button, Card, Grid, CardHeader } from "@mui/material";
import { useState, useContext } from "react";
import { associatesContext } from "../../utils/context/contexts";
import { ref, push } from "firebase/database";
import { rtdb } from "../../utils/firebase";
import ChangeTitleTask from "./addTaskElements/ChangeTitleTask";
import IncreaseSalary from "./addTaskElements/IncreaseSalary";
import { addNotification } from "../Thanks/thanksFunctions";
const AddTask = ({
  userDetails,
  myManager,
  taskType,
  handleCloseAction,
  setPopupOpen,
}) => {
  const { associates } = useContext(associatesContext);

  const hrPerson = {
    id: "4U1DWf95rJvgfAwDYs7m",
    name: "Marco Casper",
  };

  // const [show, setShow] = useState();
  const [taskValues, setTaskValues] = useState({});
  console.log(taskType, "task type");
  const handleValues = (event) => {
    // setShow(event.target.value);
    console.log(event.target.value);
    setTaskValues({
      ...taskValues,
      [event.target.name]: event.target.value,
      status: "pending",
      TaskName: taskType,
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
    console.log(taskValues);
  };
  // const handleValues = (event) => {
  //   setTaskValues({ ...taskValues,  });
  // };
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
      addNotification(approver, "task");
    });
    setPopupOpen(false);
  };
  console.log("task type", taskType);

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
        {/* <Grid item md={12}>
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
        </Grid> */}

        {taskType === "Title Change" ? (
          <Grid item md={12}>
            <Grid container direction="column" spacing={2}>
              <ChangeTitleTask
                handleValues={handleValues}
                associates={associates}
                myManager={myManager}
                hrPerson={hrPerson}
                // writeTask={writeTask}
              />
            </Grid>
          </Grid>
        ) : null}
        {taskType && taskType === "Salary Increase" ? (
          <Grid item md={12}>
            <Grid container direction="column" spacing={2}>
              <IncreaseSalary
                handleValues={handleValues}
                associates={associates}
                myManager={myManager}
                hrPerson={hrPerson}
                // writeTask={writeTask}
              />
            </Grid>
          </Grid>
        ) : null}
        <Grid item md={12}>
          <Grid container direction="rows">
            <Grid item md={6} sx={{ pr: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  handleCloseAction();
                }}
              >
                Cancel
              </Button>
            </Grid>

            <Grid item md={6}>
              <Button fullWidth variant="contained" onClick={writeTask}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AddTask;
