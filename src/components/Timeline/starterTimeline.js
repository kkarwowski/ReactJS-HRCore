import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Card } from "@mui/material";
import moment from "moment";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, app } from "../../utils/firebase.js";
import { useEffect, useState } from "react";
import { format } from "date-fns";
export default function StarterTimeline() {
  const today = new Date(moment("2021-11-1", "YYYY-MM-DD"));

  //   const lastMonth = moment().subtract(30, "days").toISOString();
  const lastMonth = new Date(moment("2021-11-1", "YYYY-MM-DD"));
  const [loading, setLoading] = useState(true);
  const [starters, setStarters] = useState([{}]);
  useEffect(() => {
    const getStarters = async () => {
      const ress = await fetchDetails();

      setLoading(false);
      setStarters(ress.data);
    };
    getStarters();
  }, []);

  const fetchDetails = async () => {
    const associatesRef = collection(db, "Associates");
    const q = query(associatesRef, where("StartDate", ">", today));
    const querySnapshot = await getDocs(q);

    return querySnapshot;
  };
  return (
    <Card>
      <Timeline position="left">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Eat</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Code</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Sleep</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Repeat</TimelineContent>
        </TimelineItem>
      </Timeline>
    </Card>
  );
}
