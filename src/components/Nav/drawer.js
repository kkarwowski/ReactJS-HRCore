import { Toolbar,List, Divider, ListItem, ListItemIcon, ListItemText,CssBaseline, Drawer, Box, Typography, AppBar  } from "@mui/material";
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import DashboardNavbar from "./DashboardNavbar";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Home from "../../pages/Home";
const drawerWidth = 200;

export default function PermanentDrawerLeft() {

return (   
    <Router> 
      {/* <associatesContext.Provider value={{associatesData, setAssociatesData}}> */}
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DashboardNavbar />
      {/* <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }} style={{ background: '#fff' }}
      >
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            HR core
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: '#ffff'
            // background: '#233044'
          },
        }}
        variant="permanent"
        anchor="left">
        <Toolbar />
        
        <List >
          {['Dashboard', 'Associates'].map((text, index) => (
            
            <ListItem button key={text} component={Link} to={text=='Dashboard'?"/" :"/" + text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText classes={{ primary: 'ffff' }} primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text} >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box
        component="main"
        // '#F4F6F8
        sx={{ flexGrow: 1, bgcolor: '#F4F6F8', p: 3 }}
      >
        {/* 'background.default' */}
        
          <Switch>
                <Route exact path ="/">
                    <Home/> 
                </Route>
                {/* <Route exact path ="/Associates">
                    <Associates/> 
                </Route>
                <Route path ="/Associates/:id">
                    <UsersDetails/>
                </Route> */}
        </Switch>
      </Box>
    </Box>
    {/* </associatesContext.Provider> */}
    </Router>
  );
}
