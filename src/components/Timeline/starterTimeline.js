import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Card, Button, CardHeader, Stack } from "@mui/material";
import moment from "moment";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, app } from "../../utils/firebase.js";
import { useEffect, useState } from "react";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";

export default function StarterTimeline() {
  // moment.defaultFormat = "dd/MM/yyyy HH:mm";
  // const today = new Date(
  //   moment("15.11.2021 00:00", moment.defaultFormat).toDate()
  // );
  const today = new Date("2021-11-15");
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  // const today = "20201-11-15T12:30:00";
  // const today = "20201-11-15T12:30:00";
  console.log("today", today);

  //   const lastMonth = moment().subtract(30, "days").toISOString();
  const lastMonth = new Date(moment("01-11-2021", "dd-MM-yyyy"));
  const [loading, setLoading] = useState(true);
  const [starters, setStarters] = useState([{}]);
  useEffect(() => {
    const getStarters = async () => {
      const ress = await fetchDetails();
      setLoading(false);
    };
    getStarters();
  }, []);

  const fetchDetails = async () => {
    const associatesRef = collection(db, "Associates");
    const q = query(
      associatesRef,
      // Monday, 15 November 2021 00:00:00
      // where("StartDate", ">", Timestamp.fromDate(new Date(lastMonth)))
      // where("StartDate", ">=", Timestamp.fromDate(new Date(today)))
      where("StartDate", ">", today)
    );
    const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    //   setStarters(...starters, {doc.data()});
    // });
    setStarters(
      querySnapshot.docs.map((user) => ({ ...user.data(), id: user.id }))
    );
    // return querySnapshot.data();
  };
  return (
    <Card>
      {loading && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          mb={5}
        >
          <CircularProgress />
        </Stack>
      )}
      <CardHeader title="Starters in last 30 days" />
      {starters && (
        <Timeline position="left" sx={{ p: 3, pt: 4 }}>
          <TimelineSeparator />

          {starters.map((starter) => {
            const { FirstName, LastName, StartDate } = starter;
            return (
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                  {StartDate && moment(StartDate.toDate()).format("MMMM Do")}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />

                  <TimelineDot color="primary" variant="filled">
                    <CheckCircleOutlineIcon fontSize="small" />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {FirstName} {LastName}
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      )}
    </Card>
  );
}
