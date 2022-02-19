import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
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
import { Grid } from "@mui/material";

const Thanks = () => {
  const toggleDrawer = (anchor, open, setSel) => () => {
    setState({ ...state, ["right"]: open });
    console.log(anchor, setSel, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [selectedThanks, setSelectedThanks] = useState();
  const TemporaryDrawer = () => {
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
        role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
      ></Box>
    );
    return (
      <Drawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    );
  };

  const { userData } = useAuth();

  const [thanks, setThanks] = useState([]);
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
                  commentButton={toggleDrawer("right", true, selectedThanks)}
                />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default Thanks;
