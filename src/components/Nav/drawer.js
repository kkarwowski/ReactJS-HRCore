import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Drawer,
  Box,
  Typography,
} from "@mui/material";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Home from "../../pages/Home";
import Associates from "../../pages/Associates";
import Upload from "../../pages/Upload";
import AssociateDetails from "../../pages/AssociateDetails";
import logo from "../../logo.png";
import NewAssociate from "../Associate/newAssociate";
const drawerWidth = 250;

export default function PermanentDrawerLeft() {
  return (
    <Router>
      {/* <associatesContext.Provider value={{associatesData, setAssociatesData}}> */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <DashboardNavbar />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "#233044",
              // background: '#233044'
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {/* <div className="logo">
          <img src={logo} />
        </div> */}
          {/* <Toolbar /> */}

          <List>
            {["Dashboard", "Associates", "Upload"].map((text, index) => (
              <ListItem
                button
                key={text}
                component={Link}
                to={text == "Dashboard" ? "/" : "/" + text}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography style={{ color: "#f7f9fc" }}>{text}</Typography>
                  }
                />
                {/* <ListItemText classes={{ primary: 'ffff' }} primary={text} /> */}
                {/* <ListItemText  sx={{color:"white"}}/> */}
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          // '#F4F6F8
          sx={{ flexGrow: 1, bgcolor: "#f4f7f9", p: 3, height: "100vh" }}
        >
          {/* #f7f9fc */}
          {/* 'background.default' */}

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/Associates">
              <Associates />
            </Route>
            <Route exact path="/Associates/:id">
              <AssociateDetails />
            </Route>
            <Route path={"/NewAssociate"}>
              <NewAssociate />
            </Route>
            <Route exact path="/Upload">
              <Upload />
            </Route>
          </Switch>
        </Box>
      </Box>
      {/* </associatesContext.Provider> */}
    </Router>
  );
}
