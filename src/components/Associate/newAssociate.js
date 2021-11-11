import { useContext, useState, useEffect } from "react";
import {
  associateContext,
  associatesContext,
  officesContext,
  updateAssociatesContext,
} from "../../utils/context/contexts";
import {
  InputLabel,
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
  Button,
  Select,
} from "@mui/material";
import * as moment from "moment";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import db from "../../utils/firebase";
import AssociateDocuments from "./subdetails/associateDocuments";

export default function NewAssociate() {
  // const [currentStep, setCurrentStep] = useState(0);
  const stepLabels = ["Personal details", "Emergency contact", "Documents"];
  const { updateAssociates, setUpdateAssociates } = useContext(
    updateAssociatesContext
  );
  const { associates, setAssciates } = useContext(associatesContext);
  const [associateID, setAssocuateID] = useState();
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
    StartDate: null,
    Gender: "",
    WorkEmail: "",
    City: "",
    PhoneNumber: "",
  });

  const [currentStep, setCurrentStep] = useState(0);

  const uploadToFirebase = async (formData) => {
    const docRef = await addDoc(collection(db, "Associates"), formData);
    setAssocuateID(docRef.id);
    console.log("ID of new user", docRef.id);
    setUpdateAssociates((updateAssociates) => updateAssociates + 1);
  };

  const makeRequest = async (formData) => {
    await uploadToFirebase(formData);
    setCurrentStep((prev) => prev + 1);
  };

  const handleNextStep = (newData, final = false) => {
    setNewAssocaite((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
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
    <div className="App">
      <Container>
        <Typography variant="h3" sx={{ pb: 5 }}>
          Add new Associate
        </Typography>
        <Card>
          <Stepper
            activeStep={currentStep}
            alternativeLabel
            sx={{ pt: 5, pb: 2 }}
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
    </div>
  );
}

const stepOneValidationSchema = Yup.object({
  FirstName: Yup.string().required().label("First Name"),
  LastName: Yup.string().required().label("Last Name"),
  Title: Yup.string().required().label("Title"),
  Gender: Yup.string().required().label("Gender"),
  Office: Yup.string().required().label("Office"),
  Department: Yup.string().required().label("Department"),
  EmplStatus: Yup.string().required().label("Employment Status"),
  PhoneNumer: Yup.string().required().label("Phone Number"),
  PrivateEmail: Yup.string()
    .email("Invalid email")
    .required()
    .label("Private Email"),
  WorkEmail: Yup.string().email("Invalid email").required().label("Work Email"),
  StartDate: Yup.date().required().label("Start Date"),
  Manager: Yup.string().label("Manager"),
});

const StepOne = (props) => {
  const { allOffices } = useContext(officesContext);
  const { associates, setAssciates } = useContext(associatesContext);
  const handleSubmit = (values) => {
    props.next(values);
    console.log("new", props.data);
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
            <Grid item sx={4}>
              <Field
                required
                name="FirstName"
                size="small"
                label="First Name"
                as={TextField}
              />
              {/* <ErrorMessage name="FirstName" /> */}
            </Grid>
            <Grid item sx={4}>
              <Field
                required
                name="LastName"
                size="small"
                label="Last Name"
                as={TextField}
              />
              {/* <ErrorMessage name="LastName" /> */}
            </Grid>
            <Grid item sx={4}>
              <Field
                required
                name="Title"
                size="small"
                label="Title"
                as={TextField}
              />
              {/* <ErrorMessage name="FirstName" /> */}
            </Grid>
            <Grid item sx={4}>
              <Field
                required
                name="Department"
                size="small"
                label="Department"
                as={TextField}
              />
            </Grid>
            <Grid item sx={4}>
              <Field
                required
                name="City"
                size="small"
                label="City"
                as={TextField}
              />
            </Grid>
            <Grid item sx={4}>
              <Field
                required
                name="WorkEmail"
                size="small"
                label="Work Email"
                // type="email"
                as={TextField}
              />
            </Grid>
            <Grid item sx={4}>
              <Field
                // type="email"
                required
                name="PrivateEmail"
                size="small"
                label="Private Email"
                as={TextField}
              />
            </Grid>
            <Grid item sx={4}>
              <Field
                // type="email"
                required
                name="PhoneNumber"
                size="small"
                label="Phone Number"
                as={TextField}
              />
            </Grid>
            <Grid item sx={4}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>

                <Field
                  labelId="demo-simple-select-label"
                  as={Select}
                  name="Gender"
                  sx={{ width: 195 }}
                  required
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
              </FormControl>
            </Grid>
            <Grid item sx={4}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Employment Status
                </InputLabel>
                <Field
                  labelId="demo-simple-select-label"
                  as={Select}
                  name="EmplStatus"
                  sx={{ width: 195 }}
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
              </FormControl>
            </Grid>
            {allOffices && (
              <Grid item>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Office</InputLabel>
                  <Field
                    as={Select}
                    name="Office"
                    sx={{ width: 195 }}
                    required
                    size="small"
                    label="Office"
                  >
                    {allOffices.map((office, index) => (
                      <MenuItem key={index} value={`${office}`}>
                        {office}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
            )}
            <Grid item>
              <Field
                name="Manager"
                component={Autocomplete}
                size="small"
                options={associates}
                getOptionLabel={(associates) =>
                  associates.FirstName + " " + associates.LastName
                }
                onChange={(e, value) => setFieldValue("Manager", value.id)}
                // onChange={(selected) => (selected = selected.FirstName)}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Manager"
                    required
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Field
                  component={DatePicker}
                  label="Start Date"
                  size="small"
                  name="StartDate"
                  value={moment(values.StartDate).toISOString()}
                  inputFormat="dd-MM-yyyy"
                  onChange={(StartDate) => {
                    setFieldValue("StartDate", moment(StartDate).toISOString());
                  }}
                  // onChange={(newValue) => {
                  //   setValue(newValue);
                  // }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
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
              {/* <ErrorMessage name="FirstName" /> */}
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
                  variant="contained"
                  type="button"
                  onClick={() => props.prev(values)}
                >
                  Back
                </Button>
                <Button variant="contained" type="submit">
                  Next
                </Button>
                <button
                  type="button"
                  onClick={() => console.log("valuess", values)}
                >
                  Log
                </button>
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
  return <AssociateDocuments userID={id} />;
};
