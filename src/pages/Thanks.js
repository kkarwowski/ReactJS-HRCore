import React, { useState, useEffect } from "react";
import { Grid, Switch, FormControlLabel, Card, Button } from "@mui/material";
import {
  ref,
  onValue,
  getDatabase,
  limitToFirst,
  query,
} from "firebase/database";
import { Link } from "react-router-dom";

import { useAuth } from "../utils/context/AuthContext";
import ThanksCard from "../components/Thanks/ThanksCard";

const Thanks = () => {
  const { userData } = useAuth();
  const [thanks, setThanks] = useState();

  useEffect(() => {
    const dbrt = getDatabase();

    const AllThanks = query(ref(dbrt, `Thanks`), limitToFirst(10));
    onValue(AllThanks, (snapshot) => {
      if (snapshot.val() != null) {
        const data = snapshot.val();
        setThanks(data);
      } else {
      }
    });
  }, []);

  return (
    <>
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
      {/* <Card> */}
      <Grid
        container
        direction="row"
        columnSpacing={1}
        rowSpacing={1}
        alignItems="center"
        sx={{ p: 1 }}
      >
        {thanks &&
          userData &&
          Object.entries(thanks).map(([key, value]) => {
            return (
              <Grid item xs={12} md={4} lg={3}>
                <ThanksCard
                  thanksId={key}
                  thanksData={value}
                  userId={userData.id}
                />
              </Grid>
            );
          })}
      </Grid>
      {/* </Card> */}
    </>
  );
};

export default Thanks;
