import {
  FormControl,
  MenuItem,
  TextField,
  Typography,
  Divider,
  Grid,
  Box,
  Button,
  Collapse,
} from "@mui/material";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InputAdornment from "@mui/material/InputAdornment";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LoadingButton from "@mui/lab/LoadingButton";
import frLocale from "date-fns/locale/fr";
import EditIcon from "@mui/icons-material/Edit";
import Countries from "../../../utils/contries.json";
import LocalizationProvider from "@mui/lab/LocalizationProvider/";
import DatePicker from "@mui/lab/DatePicker";
import {
  associateContext,
  editedContext,
  officesContext,
  updateAssociatesContext,
  updatedAssociateContext,
  departmentsContext,
} from "../../../utils/context/contexts";
import { useContext, useState, useEffect } from "react";
import * as moment from "moment";
import { Timestamp } from "firebase/firestore";
import { alpha, styled } from "@mui/material/styles";

const AssociateInfo = () => {
  const { associateData, setAssociateData } = useContext(associateContext);
  const { allOffices } = useContext(officesContext);
  const { edited, setEdited } = useContext(editedContext);
  const { allDepartments } = useContext(departmentsContext);
  const { updatedAssociate, setUpdatedAssociate, matchUpdatedAndCurrent } =
    useContext(updatedAssociateContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [openPersonal, setOpenPersonal] = useState(true);
  const [openPostal, setOpenPostal] = useState(false);
  const [personalDisabled, setPersonalDisabled] = useState(true);
  const [postalDisabled, setPostalDisabled] = useState(true);
  const { updateAssociates, setUpdateAssociates } = useContext(
    updateAssociatesContext
  );
  const CountriesArray = JSON.parse(JSON.stringify(Countries));

  const onUpdate = async (event) => {
    console.log(event.target.value);
    if (event.target.name === "Salary") {
      setUpdatedAssociate({
        ...updatedAssociate,
        [event.target.name]: event.target.value.replaceAll(",", ""),
      });
    } else {
      setUpdatedAssociate({
        ...updatedAssociate,
        [event.target.name]: event.target.value,
      });
    }
  };
  const formatter = new Intl.NumberFormat(undefined, {
    // style: "amount",
    // currency: "GBP",
    maximumSignificantDigits: 3,
  });
  const onUpdateNested = (event) => {
    setEdited(true);
    setUpdatedAssociate({
      ...updatedAssociate,
      PostalAddress: {
        ...updatedAssociate.PostalAddress,
        [event.target.name]: event.target.value,
      },
    });
  };
  // const ConvertTimestampToDate = (tstamp) => {
  //   console.log("t", tstamp);
  //   const newDate = tstamp.toDate();
  //   return newDate;
  // };

  const handleOpenPersonal = () => {
    setOpenPersonal((prev) => !prev);
  };

  const EditButtonStyles = {
    mt: 2,
    bgcolor: "grey.200",
    border: "2px solid",
    boxShadow: "none",
    color: postalDisabled || personalDisabled ? "#abb2b9" : "black",
    "&:hover": {
      backgroundColor: "#e6ebf0",
      color: "#4782da",
    },
  };

  const DisabledTextBox = {
    "& .Mui-disabled": {
      opacity: 0.8,
      "-webkit-text-fill-color": "black",
    },
  };
  return (
    <Box sx={{ p: 0, pb: 1 }} dir="ltr">
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      ></Grid>
      <Grid container direction="rows" justifyContent="space-between">
        <Grid item>
          <Button
            sx={{ mt: 2 }}
            variant="standard"
            endIcon={
              openPersonal ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
            onClick={handleOpenPersonal}
          >
            <Typography variant="overline">Personal</Typography>
          </Button>
        </Grid>
        <Grid item>
          {openPersonal && (
            <Button
              sx={{
                ...EditButtonStyles,
              }}
              variant="contained"
              color="primary"
              endIcon={<EditIcon />}
              onClick={() => setPersonalDisabled((prev) => !prev)}
            >
              Edit
            </Button>
          )}
        </Grid>
      </Grid>

      {/* <Divider variant="middle" sx={{ pb: 2 }} /> */}
      <Collapse in={openPersonal} timeout="auto" unmountOnExit>
        {/* <FormControl> */}
        <Grid
          sx={{ p: 1, pb: 5, pt: 5 }}
          container
          columnSpacing={2}
          rowSpacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={8} xl={4}>
            <TextField
              style={{ width: "100%" }}
              variant="standard"
              size="small"
              name="FirstName"
              label="First Name"
              disabled={personalDisabled}
              // InputProps={{
              //   disableUnderline: `${personalDisabled}`,
              //   // color: "#ff0000",
              // }}
              sx={DisabledTextBox}
              defaultValue={associateData.FirstName}
              onChange={(e) => onUpdate(e)}
            />
          </Grid>
          <Grid item xs={8} xl={4}>
            <TextField
              disabled={personalDisabled}
              style={{ width: "100%" }}
              size="small"
              variant="standard"
              name="LastName"
              label="Last Name"
              defaultValue={associateData.LastName}
              onChange={(e) => onUpdate(e)}
              sx={DisabledTextBox}
            />
          </Grid>
          <Grid item xs={12} xl={4}>
            <TextField
              disabled={personalDisabled}
              style={{ width: "100%" }}
              size="small"
              variant="standard"
              name="Title"
              label="Title"
              defaultValue={associateData.Title}
              onChange={(e) => onUpdate(e)}
              sx={DisabledTextBox}
            />
          </Grid>
          {allDepartments && (
            <Grid item sx={8} xm={4} xl={4}>
              <TextField
                select
                disabled={personalDisabled}
                style={{ width: "100%" }}
                name="Department"
                variant="standard"
                size="small"
                label="Department"
                defaultValue={associateData.Department}
                onChange={(e) => onUpdate(e)}
                sx={DisabledTextBox}
              >
                {allDepartments.map((department, index) => (
                  <MenuItem key={department} value={`${department}`}>
                    {department}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          <Grid item xs={8} xl={4}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              disabled={personalDisabled}
              variant="standard"
              name="PhoneNumber"
              label="Phone Number"
              defaultValue={associateData.PhoneNumber}
              onChange={(e) => onUpdate(e)}
              sx={DisabledTextBox}
            />
          </Grid>
          <Grid item xs={7} xl={4}>
            <TextField
              size="small"
              disabled={personalDisabled}
              variant="standard"
              style={{ width: "100%" }}
              defaultValue={associateData.EmplStatus}
              onChange={(e) => onUpdate(e)}
              select // tell TextField to render select
              name="EmplStatus"
              label="Employment Status"
              sx={DisabledTextBox}
            >
              <MenuItem key={"Employed"} value="Employed">
                Employed
              </MenuItem>
              <MenuItem key={"Terminated"} value="Terminated">
                Terminated
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} xl={4}>
            <TextField
              disabled={personalDisabled}
              variant="standard"
              style={{ width: "100%" }}
              size="small"
              name="WorkEmail"
              label="Work Email"
              defaultValue={associateData.WorkEmail}
              onChange={(e) => onUpdate(e)}
              sx={DisabledTextBox}
            />
          </Grid>
          <Grid item xs={12} xl={4}>
            <TextField
              disabled={personalDisabled}
              variant="standard"
              style={{ width: "100%" }}
              size="small"
              name="PrivateEmail"
              label="Private Email"
              defaultValue={associateData.PrivateEmail}
              onChange={(e) => onUpdate(e)}
              sx={DisabledTextBox}
            />
          </Grid>
          {allOffices && (
            <Grid item xs={5} xl={1}>
              <TextField
                disabled={personalDisabled}
                variant="standard"
                size="small"
                defaultValue={associateData.Office}
                onChange={(e) => onUpdate(e)}
                select // tell TextField to render select
                name="Office"
                label="Office"
                sx={DisabledTextBox}
              >
                {allOffices.map((office, index) => (
                  // <MenuItem key={`${office}`} value={`${office}`}>
                  //   {`${office}`}
                  // </MenuItem>
                  <MenuItem key={office} value={office}>
                    {office}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
          <Grid item xs={5} xl={3}>
            <TextField
              disabled={personalDisabled}
              variant="standard"
              defaultValue={associateData.Gender}
              onChange={(e) => onUpdate(e)}
              select // tell TextField to render select
              name="Gender"
              label="Gender"
              size="small"
              sx={DisabledTextBox}
            >
              <MenuItem key={"Male"} value="Male">
                Male
              </MenuItem>
              <MenuItem key={"Female"} value="Female">
                Female
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item>
            {updatedAssociate && (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  sx={DisabledTextBox}
                  disabled={personalDisabled}
                  variant="standard"
                  size="small"
                  label="Date of Birth"
                  name="DOB"
                  // value={moment(updatedAssociate.StartDate).toISOString()}
                  value={updatedAssociate.DOB.toDate()}
                  inputFormat="dd-MM-yyyy"
                  onChange={(newDate) => {
                    setUpdatedAssociate({
                      ...updatedAssociate,
                      ["DOB"]: Timestamp.fromDate(new Date(newDate)),
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={DisabledTextBox}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          </Grid>
          <Grid item>
            {updatedAssociate && (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  sx={DisabledTextBox}
                  size="small"
                  disabled={personalDisabled}
                  label="Start Date"
                  name="StartDate"
                  // value={moment(updatedAssociate.StartDate).toISOString()}
                  value={updatedAssociate.StartDate.toDate()}
                  inputFormat="dd-MM-yyyy"
                  onChange={(newDate) => {
                    setUpdatedAssociate({
                      ...updatedAssociate,
                      ["StartDate"]: Timestamp.fromDate(new Date(newDate)),
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={DisabledTextBox}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          </Grid>

          {associateData.TerminationtDate != null ?? (
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  sx={DisabledTextBox}
                  disabled={personalDisabled}
                  disabled={associateData.TerminationtDate ? false : true}
                  label="Termination Date"
                  name="TerminationDate"
                  value={
                    associateData.TerminationtDate
                      ? associateData.TerminationDate
                      : null
                  }
                  format="DD-MM-YYYY"
                  onChange={(e) => onUpdate(e)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={DisabledTextBox}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          )}

          <Grid item xs={8} xl={4}>
            <TextField
              sx={DisabledTextBox}
              disabled={personalDisabled}
              style={{ width: "100%" }}
              size="small"
              variant="standard"
              name="Salary"
              label="Salary"
              defaultValue={
                associateData.Salary
                  ? formatter.format(associateData.Salary)
                  : null
              }
              onChange={(e) => onUpdate(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">£</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Collapse>
      <Divider variant="middle" />
      <Grid container direction="rows" justifyContent="space-between">
        <Grid item>
          <Button
            sx={{ pt: 2 }}
            variant="standard"
            endIcon={
              openPostal ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
            onClick={() => {
              setOpenPostal((prev) => !prev);
            }}
          >
            <Typography variant="overline">Postal Address</Typography>
          </Button>
        </Grid>
        <Grid item>
          {openPostal && (
            <Button
              sx={EditButtonStyles}
              variant="contained"
              color="primary"
              endIcon={<EditIcon />}
              onClick={() => setPostalDisabled((prev) => !prev)}
            >
              Edit
            </Button>
          )}
        </Grid>
      </Grid>
      <Collapse in={openPostal} timeout="auto" unmountOnExit>
        <Grid
          sx={{ p: 1, pt: 4, pb: 3 }}
          container
          columnSpacing={2}
          rowSpacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} xl={6}>
            <TextField
              disabled={postalDisabled}
              style={{ width: "100%" }}
              variant="standard"
              size="small"
              name="FirstLine"
              label="First line of the address"
              defaultValue={associateData.PostalAddress.FirstLine}
              onChange={(e) => onUpdateNested(e)}
              sx={{
                // "& .Mui-disabled": {
                //   color: "black",
                // },

                "& .Mui-disabled": {
                  opacity: 0.8,
                  "-webkit-text-fill-color": "black",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} xl={6}>
            <TextField
              disabled={postalDisabled}
              style={{ width: "100%" }}
              variant="standard"
              size="small"
              name="SecondLine"
              label="Second line"
              defaultValue={associateData.PostalAddress.SecondtLine}
              onChange={(e) => onUpdateNested(e)}
              sx={{
                "& .Mui-disabled": {
                  opacity: 0.8,
                  "-webkit-text-fill-color": "black",
                },
              }}
            />
          </Grid>
          <Grid item xs={7} xl={4}>
            <TextField
              disabled={postalDisabled}
              style={{ width: "100%" }}
              variant="standard"
              size="small"
              name="Postcode"
              label="Postcode"
              defaultValue={associateData.PostalAddress.Postcode}
              onChange={(e) => onUpdateNested(e)}
              sx={{
                "& .Mui-disabled": {
                  opacity: 0.8,
                  "-webkit-text-fill-color": "black",
                },
              }}
            />
          </Grid>
          <Grid item xs={8} xl={4}>
            <TextField
              disabled={postalDisabled}
              style={{ width: "100%" }}
              variant="standard"
              size="small"
              name="City"
              label="City"
              defaultValue={associateData.PostalAddress.City}
              onChange={(e) => onUpdateNested(e)}
              sx={{
                "& .Mui-disabled": {
                  opacity: 0.8,
                  "-webkit-text-fill-color": "black",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} xl={4}>
            <TextField
              disabled={postalDisabled}
              variant="standard"
              defaultValue={associateData.PostalAddress.Country}
              onChange={(e) => onUpdateNested(e)}
              select // tell TextField to render select
              size="small"
              name="Country"
              label="Country"
              sx={{
                "& .Mui-disabled": {
                  opacity: 0.8,
                  "-webkit-text-fill-color": "black",
                },
              }}
            >
              {CountriesArray.map((country, index) => (
                <MenuItem key={country.name} value={`${country.name}`}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Collapse>
      {/* </FormControl> */}
    </Box>
  );
};
export default AssociateInfo;
