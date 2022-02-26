import { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import moment from "moment";
const AssociateChanges = ({ userID }) => {
  const [associateChanges, setAssociateChanges] = useState();

  useEffect(() => {
    const getChanges = async (userID) => {
      const ress = await fetchDetails(userID);
      setAssociateChanges(ress);
    };
    getChanges();
  }, []);

  const fetchDetails = async () => {
    const citiesRef = collection(db, "Changes");
    const q = query(citiesRef, where("AssociateID", "==", userID));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container direction="rows" justifyContent="space-between">
          <Grid item>
            <Typography variant="overline">Changes</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid items>
        <Box>
          {associateChanges && (
            <Timeline
              position="left"
              sx={{ p: 1, pt: 2 }}
              style={{ maxHeight: 400, overflow: "auto" }}
            >
              <TimelineSeparator />
              {associateChanges
                .sort((a, b) =>
                  new Date(b.Timestamp.toDate()) >
                  new Date(a.Timestamp.toDate())
                    ? 1
                    : -1
                )
                .map((change) => {
                  const { Category, Timestamp, Value, ChangedBy } = change;

                  return (
                    <TimelineItem>
                      <TimelineOppositeContent
                        color="text.secondary"
                        // sx={{ m: "auto 0" }}
                      >
                        <Typography variant="h7">
                          <strong>{Category}</strong> changed to{" "}
                          <strong>{Value}</strong>
                        </Typography>
                        <Typography variant="h7"> by {ChangedBy}</Typography>
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
                          <Grid sx={{ pl: 0 }}>
                            <Typography variant="h7">
                              {moment(Timestamp.toDate()).format("MMMM Do Y")}
                              {/* {moment(Timestamp.toDate()).format("DD/MM/yyyy")} */}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
            </Timeline>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
export default AssociateChanges;
