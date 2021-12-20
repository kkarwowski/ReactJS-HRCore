import {
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
  CardHeader,
  CardContent,
  Avatar,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import moment from "moment";

import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useContext, useEffect } from "react";
import { associatesContext } from "../../utils/context/contexts";
import ApprovalTimeline from "./approverTimeline/approvalTimeline";
import ApprovalAvatar from "./approverTimeline/approvalAvatar";
import { ref, getDatabase, update } from "firebase/database";
const TaskCard = ({ task, userID }) => {
  const { associates, setAssociates } = useContext(associatesContext);
  const [expanded, setExpanded] = useState(false);
  const getApproverDetails = (id) => {
    const associate = associates.filter((associatee) => associatee.id === id);
    return associate[0];
  };
  const requesterDetails = getApproverDetails(task.requester);
  const targetDetails = getApproverDetails(task.TargetValue);
  const [approverComments, setApproverComments] = useState();
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const updateValues = (e) => {
    setApproverComments(e.target.value);
  };
  const ApproveTask = (status) => {
    const dbrt = getDatabase();

    // const ChangedRef = ref(dbrt, `Tasks/${task.TaskPath}/`);
    // const ChangedRef = ref(
    //   dbrt,
    //   `Tasks/3bOT8x1SBesW3l9jVQmV/MyTasks/-MrNOML489WlD3Mo7kuy/`
    // );
    const ChangedRef = ref(dbrt, `Tasks/${task.TaskPath}/approvers/${userID}`);
    console.log(task.TaskPath);
    console.log(approverComments);
    update(ChangedRef, {
      status: status,
      comment: approverComments,
      timestamp: Math.round(new Date().getTime() / 1000),
    });
  };
  console.log("Task", task);
  return (
    <Card>
      <Grid
        container
        direction="column"
        sx={{
          p: 2,
          "& .MuiTextField-root": { width: "100ch" },
        }}
      >
        <Grid item>
          <Grid container direction="column">
            <Grid item sx={{ opacity: 0.7, fontSize: "12px" }}>
              Requester
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                spacing={2}
                justifyContent="space-between"
              >
                <Grid item sx={{ pb: 2 }}>
                  <Grid container direction="rows" alignItems="center">
                    <Grid item sx={{ pt: 1 }}>
                      <ApprovalAvatar
                        profilePicture={requesterDetails.profilePicture}
                        FirstName={requesterDetails.FirstName}
                        LastName={requesterDetails.LastName}
                        Title={requesterDetails.Title}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Chip
                    label={task.status}
                    size="small"
                    color={
                      task.status === "pending"
                        ? "warning"
                        : task.status === "rejected"
                        ? "error"
                        : "success"
                    }
                    variant={
                      task.status === "pending" ? "outlined" : "contained"
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ opacity: 0.7, fontSize: "12px" }}>
          Request Date
        </Grid>
        <Grid item sx={{ fontSize: "14px", pt: 1 }}>
          {moment(task.timestamp).format("D MMM YYYY")}
        </Grid>
        <Grid item sx={{ opacity: 0.7, fontSize: "12px", pt: 1 }}>
          Category
        </Grid>
        <Grid item sx={{ fontSize: "14px", pt: 1 }}>
          {task.TaskName}
        </Grid>
        <Grid item sx={{ opacity: 0.7, fontSize: "12px", pt: 1 }}>
          Target associate
        </Grid>

        <Grid item sx={{ pt: 1 }}>
          <ApprovalAvatar
            profilePicture={targetDetails.profilePicture}
            FirstName={targetDetails.FirstName}
            LastName={targetDetails.LastName}
            Title={targetDetails.Title}
          />
        </Grid>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon fontSize="small" />
        </ExpandMore>
        <Collapse in={expanded} unmountOnExit>
          {/* timeout="auto" */}

          <Grid item sx={{ opacity: 0.7, fontSize: "12px", pt: 1 }}>
            New Title
          </Grid>
          <Grid item sx={{ fontSize: "14px", pt: 1 }}>
            {task.Value}
          </Grid>
          {task.comments && (
            <>
              <Grid item sx={{ opacity: 0.7, fontSize: "12px", pt: 1 }}>
                Comments
              </Grid>
              <Grid
                item
                sx={{
                  fontSize: "14px",
                  pt: 1,
                  backgroundColor: "#ddd",
                  maxWidth: "300px",
                  "border-radius": "10px",
                }}
              >
                {task.comments}
              </Grid>
            </>
          )}
          <Grid item sx={{ opacity: 0.7, fontSize: "12px", pt: 1 }}>
            Approval
          </Grid>

          <Grid item>
            <ApprovalTimeline
              task={task}
              getApproverDetails={getApproverDetails}
            />
          </Grid>
          {task.requester === userID && (
            <Grid item sx={{ pt: 2 }}>
              <Button variant="outlined" color="error" size="small">
                Cancel Task
              </Button>
            </Grid>
          )}
          {task.approvers.hasOwnProperty(userID) &
          (task.approvers[userID].status === "pending") ? (
            <Grid item sx={{ pt: 2 }}>
              <Grid item sx={{ pb: 2 }}>
                <TextField
                  label="Comment"
                  size="small"
                  style={{ width: "100%" }}
                  onChange={updateValues}
                ></TextField>
              </Grid>
              <Grid container direction="row">
                <Grid item sx={{ pr: 1 }} md={6} xs={6} lg={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      ApproveTask("approved");
                    }}
                  >
                    Approve
                  </Button>
                </Grid>
                <Grid item sx={{ pr: 1 }} md={6} xs={6} lg={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={() => {
                      ApproveTask("rejected");
                    }}
                  >
                    Reject
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Collapse>
      </Grid>
    </Card>
  );
};

export default TaskCard;
