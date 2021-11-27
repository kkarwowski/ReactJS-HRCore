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
} from "@mui/material";
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

const AssociateHeader = () => {
  const { setUpdateAssociates } = useContext(updateAssociatesContext);

  const [value, setValue] = useState(0);
  const { associateData } = useContext(associateContext);
  const history = useNavigate();

  const handleChangetoTab = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);

  const diffDates = require("diff-dates");
  const Todayy = new Date();

  const dateDiffYears = Date();

  // const formatDate = (dateString) => {
  //   const options = { year: "numeric", month: "long", day: "numeric" };
  //   return new Date(dateString).toLocaleDateString(undefined, options);
  // };

  const DeleteAssociate = async (id) => {
    // delete from Associates
    await deleteDoc(doc(db, "Associates", id));
    // delete from Changes
    const q = query(collection(db, "Changes"), where("AssociateID", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(db, "Changes", document.id));
      console.log("Deleted from Changes DB");
    });
    // delete associate picture
    const storage = getStorage();
    const storageRef = ref(storage, `associateImages/${id}.jpg`);
    deleteObject(storageRef)
      .then(() => {
        console.log("Deleted Associate picture!");
      })
      .catch((error) => {
        console.log(error);
      });
    setUpdateAssociates((updateAssociates) => updateAssociates + 1);
    handleClose();
    history("/dashboard/associates");
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const DateDifferenceCheck = () => {
    const dateDiffYears = Date();
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
          <Button
            onClick={() => DeleteAssociate(associateData.id)}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Grid
        container
        direction="row"
        // justifyContent="flex-start"
        // alignItems="flex-start"
        // alignContent="center"
        rowSpacing={2}
        columnSpacing={2}
        // p={2}
        // pt={3}
        pb={4}
      >
        <Grid item xs={12} lg={12}>
          <Card>
            <Grid
              container
              columnSpacing={7}
              direction="row"
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              p={1}
            >
              <Grid item xs={12} lg={2} sx={{ pl: 10 }}>
                <AssociatePic />
              </Grid>
              <Grid item xs={12} lg={10}>
                <CardContent>
                  <Grid
                    container
                    direction="column"
                    columnSpacing={1}
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <Grid item>
                          <Typography variant="h4">
                            {associateData.FirstName} {associateData.LastName}
                          </Typography>
                        </Grid>
                        <Grid item sx={{ pl: 1 }}>
                          <Label
                            variant="ghost"
                            color={
                              (associateData.EmplStatus === "Terminated" &&
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
                        <Grid item Item xs={6}>
                          <Link
                            target="_blank"
                            href={`https://teams.microsoft.com/l/chat/0/0?users=${associateData.WorkEmail}`}
                          >
                            <img
                              src="https://img.icons8.com/fluency/30/000000/microsoft-teams-2019.png"
                              sx={{ pr: 2 }}
                            />
                          </Link>
                        </Grid>
                        <Grid item xs={6}>
                          <Link href={`mailto:${associateData.WorkEmail}`}>
                            <EmailIcon fontSize="large" />
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* Tab Menu*/}
                    <Grid item>
                      <Box
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",
                          pt: 3,
                        }}
                      >
                        <Tabs
                          value={value}
                          onChange={handleChangetoTab}
                          aria-label="basic tabs example"
                          variant="scrollable"
                          scrollButtons="auto"
                          scrollButtons={true}
                          allowScrollButtonsMobile
                          aria-label="scrollable auto tabs example"
                        >
                          <Tab label="Personal" {...a11yProps(0)} />
                          <Tab label="Emergency" {...a11yProps(1)} />
                          <Tab label="Notes" {...a11yProps(2)} />
                          <Tab label="Documents" {...a11yProps(3)} />
                          <Tab label="Changes" {...a11yProps(4)} />
                        </Tabs>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
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
              <AssociateInfo />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <AssociateEmergencyInfo />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <AssociateNotes />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <AssociateDocuments userID={associateData.id} />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <AssociateChanges userID={associateData.id} />
            </TabPanel>
          </Card>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-end"
          pt={4}
          pb={5}
        >
          <Grid item sx={12}>
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={() => handleClickOpen()}
            >
              Delete Associate
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default AssociateHeader;
