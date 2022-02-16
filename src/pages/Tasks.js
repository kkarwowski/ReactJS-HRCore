import Page from "../components/Page";
import AddTask from "../components/Tasks/AddTask";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { useEffect, useState, useContext } from "react";
import PaidIcon from "@mui/icons-material/Paid";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  Button,
  Grid,
  Card,
  Box,
  Typography,
  Stack,
  Menu,
  MenuItem,
  Backdrop,
  Modal,
  Fade,
} from "@mui/material";
import {
  associatesContext,
  tasksToApproveContext,
} from "../utils/context/contexts";
import { useAuth } from "../utils/context/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import TaskCard from "../components/Tasks/TaskCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Controller, useForm } from "react-hook-form";

const MyTasks = () => {
  const theme = useTheme();
  const { userData } = useAuth();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [PopupOpen, setPopupOpen] = useState(false);
  const { handleSubmit, reset, control } = useForm();
  const [taskType, setTaskType] = useState();
  // const { associates } = useContext(associatesContext);
  const [userDetails, setUserDetails] = useState();
  const [myManager, setMyManager] = useState();
  const [pendingTasks, setPendingTasks] = useState();
  const [approvedTasks, setApprovedTasks] = useState();
  const [rejectedTasks, setRejectedTasks] = useState();
  const [completeTasks, setCompleteTasks] = useState();
  const [myPendingTasks, setMyPendingTasks] = useState();
  const { tasks } = useContext(tasksToApproveContext);

  useEffect(() => {
    if (!userData) return;
    else {
      const AssociatesCollectionRef = doc(db, "Associates", userData.id);
      getDoc(AssociatesCollectionRef).then((result) => {
        setUserDetails(result.data());
        const ManagerCollectionRef = doc(
          db,
          "Associates",
          result.data().Manager
        );

        getDoc(ManagerCollectionRef).then((results) =>
          setMyManager(results.data())
        );
      });
    }
  }, []);
  console.log("taskssss in Tasks file", tasks);
  // const filterObject = (obj, filter, filterValue) =>
  //   Object.keys(obj).reduce(
  //     (acc, val) =>
  //       obj[val][filter] === filterValue
  //         ? {
  //             ...acc,
  //             [val]: obj[val],
  //           }
  //         : acc,
  //     {}
  //   );

  // const pendingTasks = filterObject(tasks, "status", "pending");
  // const approvedTasks = filterObject(tasks, "status", "approved");
  // const rejectedTasks = filterObject(tasks, "status", "rejected");
  useEffect(() => {
    console.log("we have tasks", tasks);
    setPendingTasks(tasks.filter((task) => task.status === "pending"));
    console.log(pendingTasks, "pending");
    setApprovedTasks(tasks.filter((task) => task.status === "approved"));
    setRejectedTasks(tasks.filter((task) => task.status === "rejected"));
    setCompleteTasks(approvedTasks, rejectedTasks);
    setMyPendingTasks(
      tasks.filter(
        (task) => (task.requester === userData.id) & (task.status === "pending")
      )
    );
  }, [tasks]);
  const handleClickAction = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAction = () => {
    setAnchorEl(null);
    setTaskType(null);
    setPopupOpen(false);
  };
  const handleClickOpen = (type) => {
    setTaskType(type);
    setPopupOpen(true);
    console.log(PopupOpen);
    // handleCloseAction();
    setAnchorEl(null);
    setOpen(true);
  };

  // const onSubmit = (data) => uploadFile(data);
  const handleClose = () => {
    // setPopupOpen(false);
  };

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  const style = {
    position: "absolute",
    top: { xs: "50%", md: "30%" },
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { md: "35vw", xs: "95vw" },
    height: { md: "40vh", xs: "100vh" },
    // bgcolor: "background.paper",
    // border: "2px solid #000",
    // boxShadow: 20,
    p: 4,
  };
  return (
    <Page title="HR Core - Tasks">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={PopupOpen}
        onClose={() => {
          handleClose();
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
      >
        <Fade in={PopupOpen}>
          <Box sx={style}>
            {userDetails && myManager && (
              <AddTask
                userDetails={userDetails}
                myManager={myManager}
                taskType={taskType}
                handleCloseAction={handleCloseAction}
                setPopupOpen={setPopupOpen}
              />
            )}
            {/* sx={style} */}
            {/* <Card sx={style}> */}
            {/* <form>
                <Grid
                  container
                  direction="column"
                  alignContent="center"
                  alignItems="center"
                  rowSpacing={3}
                >
                  <Grid item>
                    <Typography>
                      Please select category of uploaded file:
                    </Typography>
                  </Grid>

                  <Grid item></Grid>

                  <Grid item>
                    <Button
                      onClick={handleSubmit(onSubmit)}
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </Grid>

                  {/* <Button onClick={() => reset()} variant={"outlined"}> */}
            {/* Reset */}
            {/* </Button> */}
            {/* </Grid> */}
            {/* </form> */}
            {/* </Card> */}
          </Box>
        </Fade>
      </Modal>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        sx={{ pr: 2, pt: 2 }}
      >
        <Grid item>
          <Button
            variant="contained"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickAction}
            endIcon={<AddCircleIcon color="white" fontSize="large" />}
          >
            Add Task
          </Button>
          <Button
            variant="contained"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={() => console.log(tasks)}
            endIcon={<AddCircleIcon color="white" fontSize="large" />}
          >
            log
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={openMenu}
            onClose={() => {
              setAnchorEl(null);
            }}
          >
            <MenuItem
              onClick={() => {
                handleClickOpen("Salary Increase");
              }}
              disableRipple
            >
              <PaidIcon sx={{ color: "#ff0000" }} />
              Salary Increase
            </MenuItem>
            <MenuItem
              onClick={() => handleClickOpen("Title Change")}
              disableRipple
            >
              <ManageAccountsIcon color={"#ff0000"} />
              Title Change
            </MenuItem>
          </StyledMenu>
        </Grid>
      </Grid>

      <Grid container direction="row" sx={{ p: 2 }} spacing={2} rowSpacing={2}>
        <Grid item xs={12} md={4} lg={4}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Box
                sx={{
                  background: "white",
                  px: 1,
                  py: 0.5,
                  "border-radius": "10px",
                  boxShadow: 7,
                  borderBottom: "solid black 3px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="black">
                    My Tasks
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "black",
                      "border-radius": "5px",
                      px: 1,
                      py: 0.5,
                      color: "white",
                      minWidth: "25px",
                    }}
                  >
                    {myPendingTasks === undefined ? "0" : myPendingTasks.length}
                    {console.log(myPendingTasks, "my tasks")}
                  </Box>
                </Stack>
              </Box>
            </Grid>
            {myPendingTasks &&
              myPendingTasks.map((task, index) => {
                return (
                  <Grid item xs={12} md={4} lg={4}>
                    <TaskCard
                      task={task}
                      userID={userData.id}
                      taskPath={task.taskPath}
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
                  backgroundColor: "white",
                  px: 1,
                  py: 0.5,
                  "border-radius": "10px",
                  boxShadow: 7,
                  borderBottom: "solid #ff8c00 3px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="black">
                    To approve
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "black",
                      "border-radius": "5px",
                      px: 1,
                      py: 0.5,
                      color: "white",
                      minWidth: "25px",
                    }}
                  >
                    {pendingTasks === undefined ? "0" : pendingTasks.length}
                  </Box>
                </Stack>
              </Box>
            </Grid>
            {pendingTasks &&
              pendingTasks.map((task, index) => {
                return (
                  <Grid item xs={12} md={4} lg={4}>
                    <TaskCard
                      task={task}
                      userID={userData.id}
                      taskPath={task.taskPath}
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
                  backgroundColor: "white",
                  px: 1,
                  py: 0.5,
                  "border-radius": "10px",
                  boxShadow: 7,
                  borderBottom: "solid  #18b809 3px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="black">
                    Complete
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "black",
                      "border-radius": "5px",
                      px: 1,
                      py: 0.5,
                      color: "white",
                      minWidth: "25px",
                    }}
                  >
                    {completeTasks === undefined ? "0" : completeTasks.length}
                  </Box>
                </Stack>
              </Box>
            </Grid>
            {completeTasks &&
              completeTasks.map((task, index) => {
                return (
                  <Grid item xs={12} md={4} lg={4}>
                    <TaskCard
                      task={task}
                      userID={userData.id}
                      taskPath={task.taskPath}
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
