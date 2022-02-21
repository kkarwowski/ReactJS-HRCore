import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Drawer,
  Grid,
  Switch,
  FormControlLabel,
  Card,
  Button,
} from "@mui/material";
import {
  ref,
  on,
  set,
  push,
  onValue,
  onChildAdded,
  get,
  child,
  getDatabase,
} from "firebase/database";

import { useAuth } from "../utils/context/AuthContext";
import ThanksCard from "../components/Thanks/ThanksCard";
import ThanksComments from "../components/Thanks/ThanksCommentsElements/ThanksComments";
import ThanksCommentPost from "../components/Thanks/ThanksCommentsElements/ThanksCommentPost";
import { thanksCommentsContext } from "../utils/context/contexts";
import Scrollbar from "../components/Scrollbar";

const Thanks = () => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [selectedThanks, setSelectedThanks] = useState({});
  const { userData } = useAuth();
  const [thanks, setThanks] = useState();

  const [selectedCommentsandLikes, setSelectedCommentsandLikes] = useState();
  const toggleDrawer = (open, id, likesAndComments, thanksData) => {
    setShowSideMenu(open);
    if (open) {
      setSelectedThanks({
        id,
        likesAndComments,
        thanksData,
      });
    }
  };

  const TemporaryDrawer = () => {
    return (
      <Drawer
        // sx={{
        //   "& .MuiPaper-root": {
        //     position: "absolute",
        //     top: "50px",
        //   },
        // }}
        anchor="right"
        open={showSideMenu}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ width: 350, padding: 1 }}>
          {selectedThanks && selectedThanks.likesAndComments != undefined && (
            <ThanksCommentPost
              count={
                Object.keys(selectedThanks.likesAndComments.Comments).length
              }
              thanksId={selectedThanks.id}
              userId={userData.id}
            />
          )}
          <Box sx={{ height: "50%", width: 340 }}>
            <Scrollbar sx={{ height: "100%" }}>
              {selectedThanks &&
                selectedThanks.likesAndComments != undefined &&
                Object.values(selectedThanks.likesAndComments.Comments)
                  // .sort((a, b) =>
                  //   new Date(
                  //     selectedThanks.likesAndComments.Comments[
                  //       b
                  //     ].Timestamp.toDate()
                  //   ) >
                  //   new Date(
                  //     selectedThanks.likesAndComments.Comments[
                  //       a
                  //     ].Timestamp.toDate()
                  //   )
                  //     ? 1
                  //     : -1
                  // )
                  .map((value) => {
                    return (
                      <ThanksComments
                        timestamp={value.Timestamp}
                        id={value.Id}
                        comment={value.Comment}
                      />
                    );
                  })}
            </Scrollbar>
          </Box>
        </Box>
      </Drawer>
    );
  };

  useEffect(() => {
    const dbrt = getDatabase();

    const AllThanks = ref(dbrt, `Thanks`);
    onValue(AllThanks, (snapshot) => {
      if (snapshot.val() != null) {
        const data = snapshot.val();
        setThanks(data);
        console.log("Thanks", data);
      } else {
        console.log("no data");
      }
    });
  }, []);

  return (
    <>
      <thanksCommentsContext.Provider
        value={{ selectedCommentsandLikes, setSelectedCommentsandLikes }}
      >
        {TemporaryDrawer()}
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
            <Button variant="contained">Give Thanks</Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          columnSpacing={1}
          rowSpacing={1}
          sx={{ p: 1 }}
        >
          {thanks &&
            userData &&
            Object.entries(thanks).map(([key, value]) => {
              return (
                <Grid item xs={12} md={4} lg={4}>
                  <ThanksCard
                    thanksId={key}
                    thanksData={value}
                    userId={userData.id}
                    toggleDrawer={toggleDrawer}
                  />
                </Grid>
              );
            })}
        </Grid>
      </thanksCommentsContext.Provider>
    </>
  );
};

export default Thanks;
