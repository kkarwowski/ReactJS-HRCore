import Page from "../components/Page";
import AddTask from "../components/Tasks/AddTask";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState, useContext } from "react";
import moment from "moment";

import {
  ref,
  on,
  set,
  push,
  onValue,
  onChildAdded,
  onChildChanged,
  get,
  child,
  getDatabase,
  update,
} from "firebase/database";
// import { rtdb } from "../utils/firebase";
import { Button, Grid, Card, Box, Typography, Stack } from "@mui/material";
import { associatesContext } from "../utils/context/contexts";
import { useAuth } from "../utils/context/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import TaskCard from "../components/Tasks/TaskCard";
const MyTasks = () => {
  const theme = useTheme();
  const { userData } = useAuth();
  const { associates } = useContext(associatesContext);
  const [userDetails, setUserDetails] = useState();
  const [myManager, setMyManager] = useState();
  const [tasks, setTasks] = useState({});
  const [tasksToApprove, setTaskstoApprove] = useState({});

  useEffect(() => {
    const getDTDB = () => {
      const dbrt = getDatabase();
      const ChangedRef = ref(dbrt, `Tasks/${userData.AssociateID}/MyTasks/`);
      onValue(ChangedRef, (snapshot) => {
        if (snapshot.val() != null) {
          const data = snapshot.val();
          setTasks({ ...data });
        } else {
          setTasks({});
        }
      });
      const ChangedRefApprove = ref(
        dbrt,
        `Tasks/${userData.AssociateID}/ToApprove/`
      );
      onValue(ChangedRefApprove, (snapshot) => {
        if (snapshot.val() != null) {
          const data = snapshot.val();
          Object.keys(data).forEach((key, index) => {
            const Taskpath = data[key].TaskPath;
            onValue(ref(dbrt, `Tasks/${Taskpath}`), (snapshot) => {
              const snapp = snapshot.val();
              setTaskstoApprove((prev) => ({
                ...prev,
                [index]: { ...snapp, TaskPath: data[key].TaskPath },
              }));
            });
          });
        } else {
          setTaskstoApprove({});
        }
      });
    };
    getDTDB();

    const AssociatesCollectionRef = doc(db, "Associates", userData.AssociateID);
    getDoc(AssociatesCollectionRef).then((result) => {
      setUserDetails(result.data());
      const ManagerCollectionRef = doc(db, "Associates", result.data().Manager);

      getDoc(ManagerCollectionRef).then((results) =>
        setMyManager(results.data())
      );
    });
  }, []);

  const filterObject = (obj, filter, filterValue) =>
    Object.keys(obj).reduce(
      (acc, val) =>
        obj[val][filter] === filterValue
          ? {
              ...acc,
              [val]: obj[val],
            }
          : acc,
      {}
    );
  const pendingTasks = filterObject(tasks, "status", "pending");
  const completeTasks = filterObject(tasks, "status", "complete");
  return (
    <Page title="HR Core - Tasks">
      <Button onClick={() => {}}>Log</Button>
      <Grid container direction="row" sx={{ p: 2 }} spacing={2} rowSpacing={2}>
        <Grid item xs={12} md={4} lg={4}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Box
                sx={{
                  background: theme.palette.primary.light,
                  px: 1,
                  py: 0.5,
                  "border-radius": "10px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="white">
                    My Tasks
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: theme.palette.secondary.dark,
                      "border-radius": "5px",
                      px: 1,
                      py: 0.5,
                      color: "white",
                    }}
                  >
                    {Object.keys(pendingTasks).length}
                  </Box>
                </Stack>
              </Box>
            </Grid>
            {pendingTasks &&
              Object.keys(pendingTasks).map((task, index) => {
                return (
                  <Grid item xs={12} md={4} lg={4}>
                    <TaskCard
                      task={pendingTasks[task]}
                      userID={userData.AssociateID}
                    />
                  </Grid>
                );
              })}
            {userDetails && (
              <AddTask userDetails={userDetails} myManager={myManager} />
            )}
          </Grid>
          {/* {userDetails && (
            <AddTask userDetails={userDetails} myManager={myManager} />
          )} */}
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.light,
                  px: 1,
                  py: 0.5,
                  "border-radius": "10px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="white">
                    To approve
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: theme.palette.secondary.dark,
                      "border-radius": "5px",
                      px: 1,
                      py: 0.5,
                      color: "white",
                    }}
                  >
                    {Object.keys(tasksToApprove).length}
                  </Box>
                </Stack>
              </Box>
            </Grid>
            {tasksToApprove &&
              Object.keys(tasksToApprove).map((task, index) => {
                return (
                  <Grid item xs={12} md={4} lg={4}>
                    <TaskCard
                      task={tasksToApprove[task]}
                      userID={userData.AssociateID}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.light,
                  px: 1,
                  py: 0.5,
                  "border-radius": "10px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="white">
                    Complete
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: theme.palette.secondary.dark,
                      "border-radius": "5px",
                      px: 1,
                      py: 0.5,
                      color: "white",
                    }}
                  >
                    {Object.keys(completeTasks).length}
                  </Box>
                </Stack>
              </Box>
            </Grid>
            {completeTasks &&
              Object.keys(completeTasks).map((task, index) => {
                return (
                  <Grid item xs={12} md={4} lg={4}>
                    <TaskCard
                      task={completeTasks[task]}
                      userID={userData.AssociateID}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};
export default MyTasks;
