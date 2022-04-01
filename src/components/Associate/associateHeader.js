import {
  Grid,
  Card,
  CardContent,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Menu,
  MenuItem,
} from "@mui/material";
import { Icon } from "@iconify/react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useState, useContext } from "react";
import Label from "../Label";
import { sentenceCase } from "change-case";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { Typography, Link, Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import EmailIcon from "@mui/icons-material/Email";
import microsoftTeams from "@iconify/icons-logos/microsoft-teams";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  associateContext,
  updateAssociatesContext,
} from "../../utils/context/contexts";
import AssociateSubdetails from "./subdetails/associateSubdetails";
import AssociateInfo from "../Associate/subdetails/associatePersonal";
import AssociatePic from "./associatePicture";
import AssociateDocuments from "./subdetails/associateDocuments";
import AssociateEmergencyInfo from "./subdetails/associateEmergency";
import { db } from "../../utils/firebase";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import AssociateNotes from "./subdetails/associateNotes";
import AssociateChanges from "./subdetails/associateChanges";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled, alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { useAuth } from "../../utils/context/AuthContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AssociateHeader = ({ handleBack, updateFirebaseAndState }) => {
  const { setUpdateAssociates } = useContext(updateAssociatesContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [value, setValue] = useState(0);
  const { associateData } = useContext(associateContext);
  const history = useNavigate();
  const handleChangetoTab = (event, newValue) => {
    setValue(newValue);
  };
  const { isDemo, isAdmin } = useAuth();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const diffDates = require("diff-dates");
  const Todayy = new Date();

  const handleClickAction = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAction = () => {
    setAnchorEl(null);
  };
  const DeleteAssociate = async (id) => {
    setLoading(true);
    // delete from Associates
    if (!isDemo && isAdmin) {
      await deleteDoc(doc(db, "Associates", id));
      // delete from Changes
      try {
        const q = query(
          collection(db, "Changes"),
          where("AssociateID", "==", id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (document) => {
          await deleteDoc(doc(db, "Changes", document.id));
        });
      } catch (e) {
        console.log("Error", e);
      }
      // delete associate picture
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `associateImages/${id}.jpg`);
        deleteObject(storageRef)
          .then(() => {})
          .catch((error) => {});
      } catch (e) {
        console.log(e);
      }
    }

    setUpdateAssociates((updateAssociates) => updateAssociates + 1);
    setLoading(false);
    handleClose();
    history("/dashboard/associates");
  };
  const handleClickOpen = () => {
    setOpen(true);
    handleCloseAction();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const DateDifferenceCheck = () => {
    const difference = diffDates(Todayy, associateData.StartDate.toDate());

    if (difference > 0) {
      //if difference in years is more than 1 return in years
      if (diffDates(Todayy, associateData.StartDate.toDate(), "years") > 1) {
        return (
          "Started " +
          diffDates(Todayy, associateData.StartDate.toDate(), "years") +
          " years ago"
        );
      } else if (
        diffDates(Todayy, associateData.StartDate.toDate(), "months") < 12 &&
        diffDates(Todayy, associateData.StartDate.toDate(), "months") >= 2
      ) {
        return (
          "Started " +
          diffDates(Todayy, associateData.StartDate.toDate(), "months") +
          " months ago"
        );
      } else if (
        diffDates(Todayy, associateData.StartDate.toDate(), "days") < 62 &&
        diffDates(Todayy, associateData.StartDate.toDate(), "days") > 1
      ) {
        return (
          "Started " +
          diffDates(Todayy, associateData.StartDate.toDate(), "days") +
          " days ago"
        );
      }
    }
    if (difference < 0) {
      const dateDiffYears = diffDates(
        Todayy,
        associateData.StartDate.toDate(),
        "days"
      );
      return dateDiffYears;
    }
  };

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please confirm if you wish to Delete Associate. All Data will be
            lost including any uploaded files. Please download files before
            proceeding.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            loading={loading}
            loadingIndicator="Deleting..."
            onClick={() => DeleteAssociate(associateData.id)}
            color="error"
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Grid
        container
        direction="row"
        rowSpacing={2}
        columnSpacing={2}
        pb={4}
        sx={{ pl: { xs: 1, lg: 2 }, pr: { xs: 1, lg: 2 } }}
      >
        <Grid item xs={12} lg={12}>
          <Card>
            <Grid container direction="row">
              <Grid
                item
                xs={11}
                lg={11}
                alignItems="flex-start"
                justifyContent="flex-start"
                pt={1}
              >
                <Grid
                  container
                  columnSpacing={7}
                  direction="row"
                  justifyContent="space-around"
                  alignItems="flex-start"
                  alignContent="flex-start"
                  // p={1}
                >
                  <Grid item xs={12} lg={2.1}>
                    <Button
                      variant="text"
                      sx={{ color: "#000000" }}
                      disableRipple="true"
                      startIcon={<KeyboardArrowLeftIcon />}
                      onClick={() => handleBack()}
                    >
                      Back
                    </Button>
                    <AssociatePic />
                  </Grid>
                  <Grid item xs={12} lg={7.9}>
                    <Grid
                      container
                      direction="rows"
                      justifyContent="space-between"
                    >
                      <Grid item xs={11} md={11} lg={11}>
                        <CardContent>
                          <Grid
                            container
                            direction="column"
                            columnSpacing={1}
                            justify="space-between"
                            alignItems="flex-start"
                          >
                            <Grid item>
                              <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="flex-start"
                              >
                                <Grid item>
                                  <Typography variant="h4">
                                    {associateData.FirstName}{" "}
                                    {associateData.LastName}
                                  </Typography>
                                </Grid>
                                <Grid item sx={{ pl: 1 }}>
                                  <Label
                                    variant="ghost"
                                    color={
                                      (associateData.EmplStatus ===
                                        "Terminated" &&
                                        "error") ||
                                      "success"
                                    }
                                  >
                                    {sentenceCase(associateData.EmplStatus)}
                                  </Label>
                                </Grid>
                              </Grid>
                              <Typography variant="h6" sx={{ pb: 2 }}>
                                {associateData.Title}
                              </Typography>
                              {associateData.Department} |{" "}
                              {associateData.PostalAddress.City}
                            </Grid>
                            <Grid item sx={{ pt: 2 }}>
                              <p>{DateDifferenceCheck()}</p>
                            </Grid>
                            {/* Icons */}
                            <Grid item>
                              <Grid
                                container
                                direction="rows"
                                alignContent="center"
                                justifyItems="center"
                                sx={{ pt: 1 }}
                              >
                                <Grid item xs={6}>
                                  <Link
                                    target="_blank"
                                    href={`https://teams.microsoft.com/l/chat/0/0?users=${associateData.WorkEmail}`}
                                  >
                                    <Icon
                                      icon={microsoftTeams}
                                      width="30"
                                      height="30"
                                    />
                                  </Link>
                                </Grid>
                                <Grid item xs={6}>
                                  <Link
                                    href={`mailto:${associateData.WorkEmail}`}
                                  >
                                    <EmailIcon fontSize="large" />
                                  </Link>
                                </Grid>
                              </Grid>
                            </Grid>
                            {/* Tab Menu*/}
                            <Grid item>
                              <Box
                                sx={{
                                  // borderBottom: 1,
                                  borderColor: "divider",
                                  pt: 1,
                                  // width: "400px",
                                }}
                              >
                                <Tabs
                                  value={value}
                                  onChange={handleChangetoTab}
                                  aria-label="basic tabs example"
                                  variant="scrollable"
                                  scrollButtons="auto"
                                  // scrollButtons={true}
                                  // allowScrollButtonsMobile
                                >
                                  <Tab
                                    label="Personal"
                                    {...a11yProps(0)}
                                    style={{ fontSize: 10 }}
                                  />
                                  <Tab
                                    label="Emergency"
                                    {...a11yProps(1)}
                                    style={{ fontSize: 10 }}
                                  />
                                  <Tab
                                    label="Notes"
                                    {...a11yProps(2)}
                                    style={{ fontSize: 10 }}
                                  />
                                  <Tab
                                    label="Documents"
                                    {...a11yProps(3)}
                                    style={{ fontSize: 10 }}
                                  />
                                  <Tab
                                    label="Changes"
                                    {...a11yProps(4)}
                                    style={{ fontSize: 10 }}
                                  />
                                </Tabs>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Grid>
                      <Grid item xs={12} md={1} lg={1} mt={2}>
                        <Button
                          variant="contained"
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClickAction}
                          endIcon={<KeyboardArrowDownIcon />}
                        >
                          Actions
                        </Button>

                        <StyledMenu
                          id="demo-customized-menu"
                          MenuListProps={{
                            "aria-labelledby": "demo-customized-button",
                          }}
                          anchorEl={anchorEl}
                          open={openMenu}
                          onClose={handleCloseAction}
                        >
                          <MenuItem onClick={handleCloseAction} disableRipple>
                            <PersonOffIcon sx={{ color: "#ff0000" }} />
                            Terminate
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleClickOpen()}
                            disableRipple
                          >
                            <DeleteIcon color={"#ff0000"} />
                            Delete
                          </MenuItem>
                        </StyledMenu>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Tab Panels in seperate card*/}

        <Grid item xs={12} md={6} lg={3}>
          <Grid container direction="column" rowSpacing={2}>
            <Grid item>
              <Card>{associateData && <AssociateSubdetails />}</Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={9}>
          <Card>
            <TabPanel value={value} index={0}>
              <AssociateInfo updateFirebaseAndState={updateFirebaseAndState} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <AssociateEmergencyInfo
                updateFirebaseAndState={updateFirebaseAndState}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <AssociateNotes updateFirebaseAndState={updateFirebaseAndState} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <AssociateDocuments userID={associateData.id} />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <AssociateChanges userID={associateData.id} />
            </TabPanel>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default AssociateHeader;
