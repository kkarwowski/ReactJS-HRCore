import React, { useState, useEffect, useContext } from "react";
import { Box, Drawer, Grid } from "@mui/material";
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
const Thanks = () => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [selectedThanks, setSelectedThanks] = useState({});
  const { userData } = useAuth();
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
          {selectedThanks &&
            selectedThanks.likesAndComments != undefined &&
            Object.values(selectedThanks.likesAndComments.Comments).map(
              (value) => {
                return (
                  <ThanksComments
                    timestamp={value.Timestamp}
                    id={value.Id}
                    comment={value.Comment}
                  />
                  // <>
                  //   <div>{value.Comment}</div>
                  //   <div>{value.Timestamp}</div>
                  //   <div>{value.Id}</div>
                  // </>
                );
              }
            )}
        </Box>
      </Drawer>
    );
  };

  const [thanks, setThanks] = useState();
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
