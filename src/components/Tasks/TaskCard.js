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

const TaskCard = ({ task }) => {
  const { associates, setAssociates } = useContext(associatesContext);
  const [expanded, setExpanded] = useState(false);
  const getApproverDetails = (id) => {
    const associate = associates.filter((associatee) => associatee.id === id);
    return associate[0];
  };
  const requesterDetails = getApproverDetails(task.requester);
  const targetDetails = getApproverDetails(task.TargetValue);
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

  return (
    <Card>
      <Grid
        container
        direction="column"
        sx={{
          p: 3,
          "& .MuiTextField-root": { width: "100ch" },
        }}
      >
        <Grid item>
          <Grid container direction="column">
            <Grid item sx={{ opacity: 0.7, fontSize: "12px", pt: 1 }}>
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
          <Grid item sx={{ pt: 2 }}>
            <Button variant="outlined" color="error">
              Cancel Task
            </Button>
          </Grid>

          <Grid item sx={{ pt: 2 }}>
            <Grid container direction="row">
              <Grid item sx={{ pr: 1 }}>
                <Button variant="contained">Approve</Button>
              </Grid>
              <Button variant="contained" color="error">
                Reject
              </Button>
            </Grid>
            <Grid item sx={{ pt: 2 }}>
              <TextField
                label="Comment"
                size="small"
                style={{ width: "100%" }}
              ></TextField>
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Card>
  );
};

export default TaskCard;
