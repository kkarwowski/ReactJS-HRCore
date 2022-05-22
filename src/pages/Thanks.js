import React, { useState, useEffect } from "react";
import {
  Grid,
  Switch,
  FormControlLabel,
  Button,
  Box,
  CircularProgress,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  ref,
  onValue,
  getDatabase,
  limitToFirst,
  query,
  orderByChild,
  startAfter,
  startAt,
  endAt,
  limitToLast,
} from "firebase/database";
import { Link } from "react-router-dom";

import { useAuth } from "../utils/context/AuthContext";
import ThanksCard from "../components/Thanks/ThanksCard";
import Page from "../components/Page";

const Thanks = () => {
  const { userData } = useAuth();
  const [thanks, setThanks] = useState();
  const [filterID, setFilterID] = useState();
  const [pagination, setPagination] = useState(3);
  const paginationChoices = [3, 10, 20, 30, 40];
  useEffect(() => {
    const dbrt = getDatabase();
    const monthAgo = new Date().setDate(new Date().getDate() - 30);
    // const AllNotifications = query(ref(dbrt, `Notifications/${userData.id}`));
    const AllThanks = query(
      ref(dbrt, "Thanks"),
      orderByChild("Timestamp"),
      // startAt(monthAgo),
      limitToLast(pagination)
      // endAt("TeamPlayer")
    );
    onValue(AllThanks, (snapshot) => {
      if (snapshot.val() != null) {
        const data = snapshot.val();
        console.log(data, "all thanks");
        const tempArray = [];
        Object.entries(data).forEach(([key, value]) => {
          tempArray.push({ ...value, ThanksID: key });
        });
        setThanks(
          tempArray.sort((a, b) => (a.Timestamp < b.Timestamp ? 1 : -1))
        );
      } else {
      }
    });
  }, [pagination]);

  const filteredThanks = (array, id) => {
    if (id) {
      return array.filter((thank) => {
        return thank.To === id;
      });
    }
    return array;
  };

  return (
    <>
      <Page title="HR Core - Thanks">
        <Box
          sx={{
            px: 1,
            py: 0.5,
            mb: 2,
            borderRadius: "10px",
            boxShadow: 7,
            background: "white",
            borderBottom: "solid black 3px",
          }}
        >
          <Grid
            container
            direction="row"
            sx={{ p: 1 }}
            justifyContent="space-between"
            alignContent="center"
            alignItems="center"
          >
            <Grid item>
              <Grid
                container
                direction="row"
                columnSpacing={2}
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid item lg={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        onChange={(e) => {
                          if (e.target.checked === true) {
                            setFilterID(userData.id);
                          } else {
                            setFilterID(undefined);
                          }
                        }}
                      />
                    }
                    label="My Thanks"
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    select
                    fullWidth
                    label="Per Page"
                    value={pagination}
                    size="small"
                    onChange={(e) => setPagination(e.target.value)}
                  >
                    {paginationChoices.map((pad) => (
                      <MenuItem value={pad} key={pad}>
                        {pad}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="contained" component={Link} to={"givethanks"}>
                Give Thanks
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Grid
          container
          direction="row"
          columnSpacing={1}
          rowSpacing={1}
          alignItems="center"
        >
          {thanks && filteredThanks && userData ? (
            filteredThanks(thanks, filterID).map((thank) => {
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
