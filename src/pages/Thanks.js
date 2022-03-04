import React, { useState, useEffect } from "react";
import {
  Grid,
  Switch,
  FormControlLabel,
  Card,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  ref,
  onValue,
  getDatabase,
  limitToFirst,
  query,
  orderByKey,
} from "firebase/database";
import { Link } from "react-router-dom";

import { useAuth } from "../utils/context/AuthContext";
import ThanksCard from "../components/Thanks/ThanksCard";
import Page from "../components/Page";

const Thanks = () => {
  const { userData } = useAuth();
  const [thanks, setThanks] = useState();

  useEffect(() => {
    const dbrt = getDatabase();
    // const AllNotifications = query(ref(dbrt, `Notifications/${userData.id}`));
    const AllThanks = query(
      ref(dbrt, `Thanks`),
      orderByKey("Timestamp"),
      limitToFirst(10)
    );
    onValue(AllThanks, (snapshot) => {
      if (snapshot.val() != null) {
        const data = snapshot.val();
        const tempArray = [];
        Object.entries(data).forEach(([key, value]) => {
          tempArray.push({ ...value, ThanksID: key });
        });
        setThanks(tempArray.reverse());
      } else {
      }
    });
  }, []);

  return (
    <>
      <Page title="HR Core - Thanks">
        <Grid
          container
          direction="row"
          sx={{ p: 1 }}
          justifyContent="space-between"
        >
          <Grid item>
            <Card sx={{ paddingLeft: 1, paddingRight: 1 }}>
              <FormControlLabel control={<Switch />} label="Received Thanks" />
            </Card>
          </Grid>
          <Grid item>
            <Button variant="contained" component={Link} to={"givethanks"}>
              Give Thanks
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          columnSpacing={1}
          rowSpacing={1}
          alignItems="center"
          sx={{ p: 1 }}
        >
          {thanks && userData ? (
            thanks.map((thank) => {
              return (
                <Grid item xs={12} md={3} lg={3} key={thank.ThanksID}>
                  <ThanksCard
                    thanksId={thank.ThanksID}
                    thanksData={thank}
                    userId={userData.id}
                  />
                </Grid>
              );
            })
          ) : (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Page>
    </>
  );
};

export default Thanks;
