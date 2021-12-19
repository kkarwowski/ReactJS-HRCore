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

import moment from "moment";

import { useState, useContext, useEffect } from "react";
import { associatesContext } from "../../utils/context/contexts";
import ApprovalTimeline from "./approverTimeline/approvalTimeline";
const TaskCard = ({ task }) => {
  const { associates, setAssociates } = useContext(associatesContext);

  const getApproverDetails = (id) => {
    const associate = associates.filter((associatee) => associatee.id === id);
    console.log(associate);
    return associate[0];
  };
  console.log("task", task);
  return (
    <Card>
      {/* <CardHeader
        title={task.taskName}
        subheader={("Proposed value: ", (<strong>{task.value}</strong>))}
      /> */}
      <Grid
        container
        direction="column"
        // spacing={1}
        sx={{
          p: 3,
          "& .MuiTextField-root": { width: "100ch" },
        }}
      >
        <Grid item>
          <Grid
            container
            direction="row"
            spacing={2}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="iherit">{task.taskName}</Typography>
            </Grid>
            <Grid item>
              <Chip
                label={task.status}
                size="small"
                color={task.status === "pending" ? "warning" : "success"}
                variant={task.status === "pending" ? "outlined" : "contained"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="caption">
            {moment(task.timestamp).format("ddd, MMM YYYY")}
          </Typography>
        </Grid>
        <Grid item>
          <ApprovalTimeline
            task={task}
            getApproverDetails={getApproverDetails}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default TaskCard;
