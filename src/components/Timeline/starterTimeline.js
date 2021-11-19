import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import {
  Card,
  Button,
  CardHeader,
  Stack,
  Avatar,
  Typography,
  Grid,
} from "@mui/material";
import moment from "moment";
import { associatesContext } from "../../utils/context/contexts.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, app } from "../../utils/firebase.js";
import { useEffect, useState } from "react";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";

export default function StarterTimeline() {
  const today = new Date();
  today.setDate(today.getDate() - 30);
  // const today = "20201-11-15T12:30:00";
  // const today = "20201-11-15T12:30:00";

  const { associates, setAssociates } = React.useContext(associatesContext);

  // const fetchDetails = async () => {
  //   const associatesRef = collection(db, "Associates");
  //   const q = query(
  //     associatesRef,
  //     // where("StartDate", ">=", Timestamp.fromDate(new Date(today)))
  //     where("StartDate", ">", today)
  //   );
  //   const querySnapshot = await getDocs(q);
  //   setStarters(
  //     querySnapshot.docs.map((user) => ({ ...user.data(), id: user.id }))
  //   );
  // };

  return (
    <Card>
      <CardHeader title="Starters in last 30 days" />
      {associates && (
        <Timeline position="left" sx={{ p: 3, pt: 4 }}>
          <TimelineSeparator />
          {associates
            .filter(
              (associate) => new Date(associate.StartDate.toDate()) > today
            )
            .map((starter) => {
              const { FirstName, LastName, StartDate, profilePicture } =
                starter;
              return (
                <TimelineItem>
                  <TimelineOppositeContent
                    color="text.secondary"
                    sx={{ m: "auto 0" }}
                  >
                    {StartDate && moment(StartDate.toDate()).format("MMMM Do")}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary" variant="filled">
                      {/* <CheckCircleOutlineIcon fontSize="small" /> */}
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>

                  <TimelineContent sx={{ m: "auto 0" }}>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Grid>
                        <Avatar
                          src={profilePicture}
                          alt="Profile Pic"
                          sx={{ width: 30, height: 30 }}
                        />
                      </Grid>
                      <Grid sx={{ pl: 3 }}>
                        <Typography>{FirstName}</Typography>
                      </Grid>
                    </Grid>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
        </Timeline>
      )}
    </Card>
  );
}
