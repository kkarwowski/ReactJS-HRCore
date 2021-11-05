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
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function NewAssociate() {
  // const [currentStep, setCurrentStep] = useState(0);
  const stepLabels = ["Personal details", "Emergency contact", "Documents"];

  const { associates, setAssciates } = useContext(associatesContext);
  const { allOffices } = useContext(officesContext);

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
    <StepOne next={handleNextStep} data={newAssociate} />,
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
});

const StepOne = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };

  return (
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Grid
            sx={{ p: 1, pb: 2 }}
            container
            columnSpacing={2}
            rowSpacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Field
                required
                name="FirstName"
                size="small"
                label="First Name"
                as={TextField}
              />
              {/* <ErrorMessage name="FirstName" /> */}
            </Grid>
            <Grid item>
              <Field
                required
                name="LastName"
                size="small"
                label="Last Name"
                as={TextField}
              />
              {/* <ErrorMessage name="LastName" /> */}
            </Grid>
          </Grid>
          <Button variant="contained" type="submit">
            Next
          </Button>
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
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
