import { useContext, useState } from "react";
import {
  associatesContext,
  officesContext,
  updateAssociatesContext,
  departmentsContext,
} from "../../utils/context/contexts";
import InputAdornment from "@mui/material/InputAdornment";
import { useAuth } from "../../utils/context/AuthContext";

import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  InputLabel,
  Container,
  FormControl,
  MenuItem,
  TextField,
  Grid,
  Card,
  Typography,
  Step,
  Stepper,
  StepLabel,
  Button,
  Select,
} from "@mui/material";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Timestamp } from "firebase/firestore";
import AssociateDocuments from "./subdetails/associateDocuments";
import Page from "../Page";
export default function NewAssociate() {
  const { isDemo } = useAuth();
  // const [currentStep, setCurrentStep] = useState(0);
  const stepLabels = ["Personal details", "Emergency contact", "Documents"];
  const { setUpdateAssociates } = useContext(updateAssociatesContext);
  const [associateID, setAssociateID] = useState();
  const [newAssociate, setNewAssocaite] = useState({
    emergencyInfo: {
      TelephoneNumber: "",
      LastName: "",
      FirstName: "",
      Relationship: "",
    },
    PostalAddress: {
      City: "",
      FirstLime: "",
      SecondLine: "",
      Postcode: "",
      Country: "",
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
    StartDate: new Date(),
    Gender: "",
    WorkEmail: "",
    City: "",
    PhoneNumber: "",
    DOB: new Date(),
    Salary: "",
    Notes: "",
  });
  const history = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const uploadToFirebase = async (formData) => {
    const docRef = await addDoc(collection(db, "Associates"), formData);
    setAssociateID(docRef.id);
    setUpdateAssociates((updateAssociates) => updateAssociates + 1);
  };

  const makeRequest = async (formData) => {
    !isDemo && (await uploadToFirebase(formData));

    setCurrentStep((prev) => prev + 1);
  };

  const handleNextStep = (newData, final = false) => {
    setNewAssocaite((prev) => ({
      ...prev,
      ...newData,
    }));

    if (final) {
      const newObject = Object.assign({}, newData, {
        StartDate: Timestamp.fromDate(newData.StartDate),
        DOB: Timestamp.fromDate(newData.DOB),
      });
      makeRequest(newObject);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setNewAssocaite((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne
      next={handleNextStep}
      data={newAssociate}
      setNew={setNewAssocaite}
    />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={newAssociate} />,
    <StepThree id={associateID} />,
  ];

  return (
    <Page title="HR Core - New Associate">
      <Container>
        <Typography variant="h4" sx={{ pb: 1 }}>
          Add new Associate
        </Typography>
        {currentStep === 0 && (
          <Button
            variant="outlined"
            onClick={() => history("/dashboard/associates")}
            size="medium"
          >
            Back
          </Button>
        )}
        <Card sx={{ mt: 2 }}>
          <Stepper
            activeStep={currentStep}
            alternativeLabel
            sx={{ pt: 3, pb: 2 }}
          >
            {stepLabels.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {steps[currentStep]}
        </Card>
      </Container>
    </Page>
  );
}

const stepOneValidationSchema = Yup.object({
  FirstName: Yup.string().required().label("First Name"),
  LastName: Yup.string().required().label("Last Name"),
  Title: Yup.string().required().label("Title"),
  Gender: Yup.string().required().label("Gender"),
  City: Yup.string().required().label("City"),
  EmplStatus: Yup.string().required().label("Employment Status"),
  PhoneNumber: Yup.string().required().label("Phone Number"),
  StartDate: Yup.date().required().label("Start Date"),
  DOB: Yup.date().required().label("Birth Date"),
  Office: Yup.string().required().label("Office"),
  Department: Yup.string().required().label("Department"),
  Manager: Yup.string().label("Manager"),
  PrivateEmail: Yup.string()
    .email("Invalid email")
    .required()
    .label("Private Email"),
  WorkEmail: Yup.string().email("Invalid email").required().label("Work Email"),
  Salary: Yup.string().required().label("Salary"),
});

const StepOne = (props) => {
  const { allOffices } = useContext(officesContext);
  const { allDepartments } = useContext(departmentsContext);
  const { associates } = useContext(associatesContext);
  const handleSubmit = (values) => {
    props.next(values);
  };

  return (
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <Grid
            sx={{ p: 3, pb: 2, pt: 6 }}
            container
            columnSpacing={2}
            rowSpacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item sx={4} sm={4} xl={4}>
              <Field
                fullWidth
                required
                name="FirstName"
                size="small"
                label="First Name"
                as={TextField}
              />
              <ErrorMessage name="FirstName" />
            </Grid>
            <Grid item sx={4} sm={4} xl={4}>
              <Field
                fullWidth
                required
                name="LastName"
                size="small"
                label="Last Name"
                as={TextField}
              />
              <ErrorMessage name="LastName" />
            </Grid>
            <Grid item sx={4} sm={4} xl={4}>
              <Field
                fullWidth
                required
                name="Title"
                size="small"
                label="Title"
                as={TextField}
              />
              <ErrorMessage name="Title" />
            </Grid>
            {allDepartments && (
              <Grid item sx={4} sm={4} xl={4}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Field
                    as={Select}
                    name="Department"
                    required
                    size="small"
                    label="Department"
                    fullWidth
                  >
                    {allDepartments.map((department, index) => (
                      <MenuItem key={index} value={`${department}`}>
                        {department}
                      </MenuItem>
                    ))}
                  </Field>
                  {/* <Field
                  fullWidth
                  as={Select}
                  name="Department"
                  // sx={{ width: "100%" }}
                  required
                  size="small"
                  label="Department"
                >
                  {allDepartments.map((department, index) => (
                    <MenuItem key={index} value={`${department}`}>
                      {department}
                    </MenuItem>
                  ))}
                </Field> */}
                  <ErrorMessage name="Department" />
                </FormControl>
              </Grid>
            )}
            <Grid item sx={4} sm={4} xl={4}>
              <Field
                fullWidth
                required
                name="City"
                size="small"
                label="City"
                as={TextField}
              />
              <ErrorMessage name="City" />
            </Grid>
            <Grid item sx={4} sm={4} xl={4}>
              <Field
                required
                fullWidth
                name="WorkEmail"
                size="small"
                label="Work Email"
                // type="email"
                as={TextField}
              />
              <ErrorMessage name="WorkEmail" />
            </Grid>
            <Grid item sx={4} sm={4} xl={4}>
              <Field
                // type="email"
                required
                fullWidth
                name="PrivateEmail"
                size="small"
                label="Private Email"
                as={TextField}
              />
              <ErrorMessage name="PrivateEmail" />
            </Grid>
            <Grid item sx={4} sm={4} xl={4}>
              <Field
                // type="email"
                required
                fullWidth
                name="PhoneNumber"
                size="small"
                label="Phone Number"
                as={TextField}
              />
              <ErrorMessage name="PhoneNumber" />
            </Grid>
            <Grid item sx={4} sm={4} xl={4}>
              <Field
                // type="email"
                required
                fullWidth
                name="Salary"
                size="small"
                label="Salary"
                as={TextField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">£</InputAdornment>
                  ),
                }}
              />
              <ErrorMessage name="Salary" />
            </Grid>
            <Grid item sx={4} sm={4} xl={4}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Field
                  // labelId="demo-simple-select-label"
                  shrink={true}
                  as={Select}
                  name="Gender"
                  // sx={{ width: 195 }}
                  required
                  // inputProps={{ min: 0, style: { textAlign: "center" } }}
                  size="small"
                  label="Gender"
                >
                  <MenuItem key={1} value="Female">
                    Female
                  </MenuItem>
                  <MenuItem key={2} value="Male">
                    Male
                  </MenuItem>
                </Field>
                <ErrorMessage name="Gender" />
              </FormControl>
            </Grid>
            <Grid item sx={4} sm={4} xl={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Employment Status
                </InputLabel>
                <Field
                  labelId="demo-simple-select-label"
                  as={Select}
                  name="EmplStatus"
                  // sx={{ width: 195 }}
                  required
                  size="small"
                  // id="demo-simple-select"
                  label="Employment Status"
                  // label="Employment Status"
                >
                  <MenuItem key={1} value="Employed">
                    Employed
                  </MenuItem>
                  <MenuItem key={2} value="Terminated">
                    Terminated
                  </MenuItem>
                </Field>
                <ErrorMessage name="EmplStatus" />
              </FormControl>
            </Grid>
            {allOffices && (
              <Grid item sx={4} sm={4} xl={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Office</InputLabel>
                  <Field
                    as={Select}
                    name="Office"
                    // sx={{ width: 195 }}
                    required
                    size="small"
                    label="Office"
                    fullWidth={true}
                  >
                    {allOffices.map((office, index) => (
                      <MenuItem key={index} value={`${office}`}>
                        {office}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage name="Office" />
                </FormControl>
              </Grid>
            )}
            <Grid item sx={4} sm={4} xl={4}>
              <Field
                name="Manager"
                fullWidth
                component={Autocomplete}
                size="small"
                options={associates}
                getOptionLabel={(associates) =>
                  associates.FirstName + " " + associates.LastName
                }
                onChange={(e, value) => {
                  if (value != null) {
                    setFieldValue("Manager", value.id);
                  }
                }}
                // onChange={(selected) => (selected = selected.FirstName)}
                // style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Manager"
                    required
                    variant="outlined"
                    fullWidth={true}
                  />
                )}
              />
              <ErrorMessage name="Manager" />
            </Grid>

            <Grid item sx={4} sm={4} xl={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Field
                  fullWidth
                  component={DatePicker}
                  label="Start Date"
                  size="small"
                  name="StartDate"
                  value={values.StartDate}
                  inputFormat="dd-MM-yyyy"
                  onChange={(StartDate) => {
                    setFieldValue(
                      "StartDate",
                      new Date(StartDate)
                      // Timestamp.fromDate(new Date(StartDate))
                    );
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <ErrorMessage name="StartDate" />
            <Grid item sx={4} sm={4} xl={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Field
                  component={DatePicker}
                  label="Birth Date"
                  size="small"
                  name="DOB"
                  value={values.DOB}
                  inputFormat="dd-MM-yyyy"
                  onChange={(DOB) => {
                    setFieldValue("DOB", new Date(DOB));
                    // setFieldValue("DOB", Timestamp.fromDate(new Date(DOB)));
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <ErrorMessage name="DOB" />
          </Grid>
          <Grid
            sx={{ p: 3, pb: 2 }}
            container
            columnSpacing={2}
            rowSpacing={2}
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Grid item>
              <Button variant="contained" type="submit">
                Next
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const stepTwoValidationSchema = Yup.object({
  emergencyInfo: Yup.object().shape({
    FirstName: Yup.string().required().label("First Name"),
    LastName: Yup.string().required().label("Last Name"),
    TelephoneNumber: Yup.string().required().label("Telephone Number"),
    Relationship: Yup.string().required().label("Relationship"),
  }),
});

const StepTwo = (props) => {
  const handleSubmit = (values) => {
    props.next(values, true);
  };

  return (
    <Formik
      validationSchema={stepTwoValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <Grid
            sx={{ p: 3, pb: 2, pt: 6 }}
            container
            columnSpacing={2}
            rowSpacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item sx={4}>
              <Field
                required
                name="emergencyInfo.FirstName"
                size="small"
                label="First Name"
                as={TextField}
              />
              <ErrorMessage name="emergencyInfo.FirstName" />
            </Grid>
            <Grid item sx={4}>
              <Field
                required
                name="emergencyInfo.LastName"
                size="small"
                label="Last Name"
                as={TextField}
              />
            </Grid>
            <Grid item sx={4}>
              <Field
                required
                name="emergencyInfo.TelephoneNumber"
                size="small"
                label="Telephone Number"
                as={TextField}
              />
            </Grid>
            <Grid item sx={4}>
              <Field
                required
                name="emergencyInfo.Relationship"
                size="small"
                label="Relationship"
                as={TextField}
              />
            </Grid>
            <Grid
              sx={{ p: 3, pb: 2 }}
              container
              columnSpacing={2}
              rowSpacing={2}
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Grid item>
                <Button
                  variant="outlined"
                  type="button"
                  sx={{ marginRight: 2 }}
                  onClick={() => props.prev(values)}
                >
                  Back
                </Button>
                <Button variant="contained" type="submit">
                  Next
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* <button type="submit">Submit</button> */}
        </Form>
      )}
    </Formik>
  );
};
const StepThree = ({ id }) => {
  const { isDemo } = useAuth();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState();
  const history = useNavigate();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"New Associate succesfully added!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please select where you wish to go:
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => history(`/associates/`)}>
            All Associates
          </Button>
          {!isDemo && (
            <Button
              onClick={() => history(`/dashboard/associates/${id}`)}
              color="success"
            >
              See new Associate profile
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Grid container sx={{ padding: 2 }}>
        <Grid item xs={12} lg={12} md={12}>
          <AssociateDocuments userID={id} />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          rowSpacing={2}
          columnSpacing={2}
          pt={3}
          pb={4}
        >
          <Grid item>
            <Button
              variant="contained"
              type="button"
              onClick={() => setOpen(true)}
            >
              Finish
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
