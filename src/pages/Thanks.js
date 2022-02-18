import React, { useState, useEffect } from "react";
import { Box, Card } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
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
      <div>
        {/* {["left", "right", "top", "bottom"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))} */}

        <Drawer
          anchor="right"
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </div>
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
      <Grid container direction="row" columnSpacing={1} rowSpacing={1}>
        {thanks &&
          userData &&
          Object.entries(thanks).map(([key, value]) => {
            return (
              <Grid item xs={1} md={2} lg={4}>
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
