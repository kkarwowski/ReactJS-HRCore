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

export default function BirthdayTimeline() {
  const today = new Date();
  const now = moment(today);
  console.log("now", now);
  // const today = "20201-11-15T12:30:00";
  // const today = "20201-11-15T12:30:00";
  const { associates, setAssociates } = React.useContext(associatesContext);
  const GetInitial = (name) => {
    return name.slice(0, 1) + ".";
  };
  const BirthdayFunc = (arrayofAssocaites) => {
    const haveBirthdaySoon = [];
    arrayofAssocaites.forEach((associate) => {
      const birthDay = moment(associate.DOB.toDate()).year(now.year());
      console.log(birthDay);
      const birthDayNextYear = moment(associate.DOB.toDate()).year(
        now.year() + 1
      );
      const daysRemaining = Math.min(
        Math.abs(birthDay.diff(now, "days")),
        Math.abs(birthDayNextYear.diff(now, "days"))
      );

      if (daysRemaining >= 0 && daysRemaining <= 30) {
        haveBirthdaySoon.push(associate);
      }
    });
    console.log(haveBirthdaySoon);

    return haveBirthdaySoon.slice().sort((a, b) => b.DOB - a.DOB);
  };

  return (
    <Card>
      <CardHeader title="Upcoming Birthdays" />
      {associates && (
        <Timeline position="left" sx={{ p: 3, pt: 4 }}>
          <TimelineSeparator />
          {BirthdayFunc(associates)
            .filter((associate) => associate.emplStatus != "Terminated")
            .map((starter) => {
              const { FirstName, LastName, profilePicture, DOB } = starter;

              return (
                <TimelineItem>
                  <TimelineOppositeContent
                    color="text.secondary"
                    sx={{ m: "auto 0" }}
                  >
                    {DOB && moment(DOB.toDate()).format("MMMM Do")}
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
                      <Grid sx={{ pl: 2 }}>
                        <Typography>
                          {FirstName} {GetInitial(FirstName)}
                          {/* {GetInitial(FirstName)} */}
                        </Typography>
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
