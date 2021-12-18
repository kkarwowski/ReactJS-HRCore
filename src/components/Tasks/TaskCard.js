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
import CircleIcon from "@mui/icons-material/Circle";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import moment from "moment";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { useState, useContext, useEffect } from "react";
import { Box } from "@mui/system";
import ResponsiveAvatar from "../Associate/ResponsiveAvatar";
import {
  associatesContext,
  myDetailsContext,
} from "../../utils/context/contexts";

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
        spacing={1}
        sx={{
          p: 3,
          "& .MuiTextField-root": { m: 1, width: "100ch" },
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
          Approval status
          <Divider variant="fullWidth" sx={{ pb: 2 }} />
        </Grid>
        <Grid item>
          <Timeline position="right">
            <TimelineSeparator />

            {task.approvers.map((approver) => {
              const { approverID, status, timestamp, comment } = approver;
              const approverDetails = getApproverDetails(approverID);
              return (
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineConnector />

                    {status === "pending" ? (
                      <CircleIcon
                        fontSize="small"
                        sx={{ mt: 1, mb: 1 }}
                        color="warning"
                      />
                    ) : status === "rejected" ? (
                      <CancelIcon
                        color="error"
                        fontSize="small"
                        sx={{ mt: 1, mb: 1 }}
                      />
                    ) : (
                      <CheckCircleIcon
                        color="success"
                        fontSize="small"
                        sx={{ mt: 1, mb: 1 }}
                      />
                    )}
                    <TimelineConnector />
                  </TimelineSeparator>

                  <TimelineContent style={{ flex: 600 }}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="rows"
                          spacing={2}
                          alignItems="center"
                        >
                          <Grid item>
                            {timestamp === "pending" ? (
                              <Typography variant="tiny">pending</Typography>
                            ) : (
                              <Grid container direction="column">
                                <Grid item></Grid>
                                <Typography variant="tinyBold">
                                  {moment.unix(timestamp).format("D MMM")}
                                </Typography>
                                <Grid item>
                                  <Typography variant="tiny">
                                    {moment.unix(timestamp).format("H:mm")}
                                  </Typography>
                                </Grid>
                              </Grid>
                            )}
                          </Grid>
                          <Grid item>
                            <Avatar
                              src={approverDetails.profilePicture}
                              alt="Profile Pic"
                              sx={{ width: 40, height: 40 }}
                            />
                          </Grid>

                          <Grid item>
                            <Grid container direction="column" spacing={0.1}>
                              <Grid item>
                                <Typography variant="tinyBold">
                                  {approverDetails.FirstName +
                                    " " +
                                    approverDetails.LastName}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="tiny">
                                  {approverDetails.Title}
                                </Typography>
                              </Grid>
                              {comment && (
                                <Grid item>
                                  <Box
                                    sx={{
                                      backgroundColor: "#f0f0f0",
                                      maxWidth: "20ch",
                                    }}
                                  >
                                    <Typography variant="tiny">
                                      {comment}
                                    </Typography>
                                  </Box>
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* <Grid item>
                        <Chip
                          label={status}
                          size="small"
                          color={status === "pending" ? "warning" : "success"}
                          variant={
                            status === "pending" ? "outlined" : "contained"
                          }
                        />
                      </Grid> */}
                    </Grid>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Grid>

        {/* <TimelineItem>
            <TimelineSeparator>
              <PendingIcon
                color="warning"
                fontSize="small"
                sx={{ mt: 1, mb: 1 }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent></TimelineContent>
          </TimelineItem>
   */}
        {/* {task.approvers.map((approver) => {
          const { approverID, status } = approver;
          return (
            <Grid item>
              <Grid container direction="row" justifyContent="space-between">
                <Grid item>
                  <Grid
                    container
                    direction="rows"
                    spacing={2}
                    alignItems="center"
                  >
                    <Grid item>
                      <Avatar
                        src={getApproverDetails(approverID).profilePicture}
                        alt="Profile Pic"
                        sx={{ width: 30, height: 30 }}
                      />
                    </Grid>

                    <Grid item>
                      {getApproverDetails(approverID).FirstName +
                        " " +
                        getApproverDetails(approverID).LastName}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Chip
                    label={status}
                    size="small"
                    color={status === "pending" ? "warning" : "success"}
                    variant={status === "pending" ? "outlined" : "contained"}
                  />
                </Grid>
              </Grid>
            </Grid>
          );
        })} */}

        <Grid item>
          <Divider variant="fullWidth" sx={{ pb: 2 }} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default TaskCard;
