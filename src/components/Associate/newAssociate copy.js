import { useContext, useState } from "react";
import {
  associatesContext,
  officesContext,
} from "../../utils/context/contexts";
import {
  Container,
  FormControl,
  MenuItem,
  TextField,
  Grid,
  Box,
  Card,
  Typography,
  Divider,
  Step,
  Stepper,
  StepLabel,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";

const steps = ["Personal details", "Emergency contact", "Documents"];

const NewAssociate = () => {
  const top100Films = [];
  const [activeStep, setActiveStep] = useState(0);
  const { allOffices } = useContext(officesContext);
  const { associates, setAssciates } = useContext(associatesContext);
  const [newAssociate, setNewAssocaite] = useState({
    emergencyInfo: {
      TelephoneNumber: "",
      LastName: "",
      FirstName: "",
      Relationship: "",
    },
    profilePicture: "",
    FirstName: "",
    Title: "",
    Department: "",
    Manager: "",
    PrivateEmail: "",
    Office: "",
    LastName: "",
    EmplStatus: "",
    StartDate: "",
    Gender: "",
    WorkEmail: "",
    City: "",
    PhoneNumber: "",
  });

  const onUpdate = (event) => {
    setNewAssocaite({
      ...newAssociate,
      [event.target.name]: event.target.value,
    });
  };
  const handleSave = () => {
    uploadToFirebase();
  };
  const uploadToFirebase = () => {};

  return (
    <Container>
      <Typography variant="h3" sx={{ pb: 5 }}>
        Add new Associate
      </Typography>
      <Card>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ pt: 5, pb: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <FormControl sx={{ p: 2 }}>
          {/* <form onSubmit={e =>onSubmit(e)}> */}
          <Typography variant="inherit" sx={{ p: 2, pb: 1 }}>
            Basic Information
          </Typography>
          <Grid
            sx={{ p: 1, pb: 2 }}
            container
            columnSpacing={2}
            rowSpacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {/* <Grid item >
                        {edited && <Button variant="contained" type="submit">Save</Button>}
                        </Grid> */}

            <Grid item xs={2} xm={2}>
              <TextField
                required
                style={{ width: "100%" }}
                size="small"
                name="FirstName"
                label="First Name"
                defaultValue={""}
                onChange={(e) => onUpdate(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                style={{ width: "100%" }}
                size="small"
                name="LastName"
                label="Last Name"
                defaultValue={""}
                onChange={(e) => onUpdate(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                size="small"
                sx={{ width: 300 }}
                name="Title"
                label="Title"
                defaultValue={""}
                onChange={(e) => onUpdate(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                style={{ width: "100%" }}
                size="small"
                name="Department"
                label="Department"
                defaultValue={""}
                onChange={(e) => onUpdate(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                style={{ width: "100%" }}
                size="small"
                name="PhoneNumber"
                label="Phone Number"
                defaultValue={""}
                onChange={(e) => onUpdate(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                sx={{ width: 250 }}
                size="small"
                name="WorkEmail"
                label="Work Email"
                defaultValue={""}
                onChange={(e) => onUpdate(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                size="small"
                name="PrivateEmail"
                label="Private Email"
                defaultValue={""}
                sx={{ width: 250 }}
                onChange={(e) => onUpdate(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                style={{ width: "100%" }}
                size="small"
                name="City"
                label="City"
                defaultValue={""}
                onChange={(e) => onUpdate(e)}
              />
            </Grid>
            {allOffices && (
              <Grid item>
                <TextField
                  size="small"
                  value={""}
                  onChange={(e) => onUpdate(e)}
                  select // tell TextField to render select
                  required
                  name="Office"
                  label="Office"
                  sx={{ width: 120 }}
                >
                  {allOffices.map((office, index) => (
                    <MenuItem key={index} value={`${office}`}>
                      {office}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
            <Grid item>
              <TextField
                required
                size="small"
                value={""}
                onChange={(e) => onUpdate(e)}
                select // tell TextField to render select
                name="EmplStatus"
                label="Employment Status"
                sx={{ width: 195 }}
              >
                <MenuItem key={1} value="Employed">
                  Employed
                </MenuItem>
                <MenuItem key={2} value="Terminated">
                  Terminated
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                value={""}
                size="small"
                onChange={(e) => onUpdate(e)}
                select // tell TextField to render select
                name="Gender"
                label="Gender"
                sx={{ width: 100 }}
              >
                <MenuItem key={1} value="Male">
                  Male
                </MenuItem>
                <MenuItem key={2} value="Female">
                  Female
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  size="small"
                  label="Start Date"
                  name="StartDate"
                  defaultValue={null}
                  format="DD-MM-YYYY"
                  onChange={(e) => onUpdate(e)}
                  // onChange={(newValue) => {
                  //   setValue(newValue);
                  // }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Manager" />
                )}
              />
            </Grid>
          </Grid>

          <Box sx={{ pt: 3, pb: 1 }} dir="ltr">
            <Divider variant="middle" sx={{ pb: 0 }} />
            <Typography variant="inherit" sx={{ p: 2, pb: 1 }}>
              Emergency Information
            </Typography>
            <Grid
              sx={{ p: 1, pb: 5, pt: 2 }}
              container
              columnSpacing={2}
              rowSpacing={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={2} xm={2}>
                <TextField
                  style={{ width: "100%" }}
                  size="small"
                  name="FirstName"
                  label="First Name"
                  defaultValue={""}
                  onChange={(e) => onUpdate(e)}
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "100%" }}
                  size="small"
                  name="LastName"
                  label="Last Name"
                  defaultValue={""}
                  onChange={(e) => onUpdate(e)}
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "100%" }}
                  size="small"
                  name="Relationship"
                  label="Relationship"
                  defaultValue={""}
                  onChange={(e) => onUpdate(e)}
                />
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "100%" }}
                  size="small"
                  name="TelephoneNumber"
                  label="Telephone Nummber"
                  defaultValue={""}
                  onChange={(e) => onUpdate(e)}
                />
              </Grid>
            </Grid>
          </Box>
        </FormControl>
      </Card>
    </Container>
  );
};

export default NewAssociate;
