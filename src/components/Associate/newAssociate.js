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
  Button,
  Select,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import frLocale from "date-fns/locale/fr";

export default function NewAssociate() {
  // const [currentStep, setCurrentStep] = useState(0);
  const stepLabels = ["Personal details", "Emergency contact", "Documents"];

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
    StartDate: null,
    Gender: "",
    WorkEmail: "",
    City: "",
    PhoneNumber: "",
  });

  const uploadToFirebase = () => {};
  const [currentStep, setCurrentStep] = useState(0);

  const makeRequest = (formData) => {
    console.log("Form Submitted", formData);
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
  ];

  console.log("data", newAssociate);

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
  // Manager: Yup.string().label("Manager"),
});

const StepOne = (props) => {
  const { allOffices } = useContext(officesContext);
  const { associates, setAssciates } = useContext(associatesContext);
  const handleSubmit = (values) => {
    props.next(values);
    console.log(values);
    console.log("new", props.data);
  };

  return (
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
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
              {/* <ErrorMessage name="FirstName" /> */}
            </Grid>
            <Grid item sx={4}>
              <Field
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
            </Grid>
            <Grid item sx={4}>
              <Field
                as={Select}
                name="EmplStatus"
                sx={{ width: 195 }}
                required
                size="small"
                label="Employment Status"
              >
                <MenuItem key={1} value="Employed">
                  Employed
                </MenuItem>
                <MenuItem key={2} value="Terminated">
                  Terminated
                </MenuItem>
              </Field>
            </Grid>
            {allOffices && (
              <Grid item>
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
              </Grid>
            )}
            <Grid item>
              <Field
                name="Manager"
                component={Autocomplete}
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
                <DatePicker
                  label="Start Date"
                  name="StartDate"
                  value={frLocale}
                  format="DD-MM-YYYY"
                  onChange={(e, value) => setFieldValue("StartDate", value)}
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
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
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
          <p>Email</p>
          <Field name="email" />
          <ErrorMessage name="email" />

          <p>Password</p>
          <Field name="password" />
          <ErrorMessage name="password" />

          <button type="button" onClick={() => props.prev(values)}>
            Back
          </button>
          <button type="button" onClick={() => console.log("valuess", values)}>
            Log
          </button>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
