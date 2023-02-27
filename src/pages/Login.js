import {
  Button,
  Box,
  Grid,
  Card,
  TextField,
  CardContent,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useAuth } from "../utils/context/AuthContext";
import { Formik, Form, ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import Logo from "../components/Logo";
import Page from "../components/Page";
import { useNavigate, useLocation } from "react-router-dom";
const Login = () => {
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { login, resetUserPassword, currentUser } = useAuth();
  let navigate = useNavigate();

  let location = useLocation();
  console.log("location", location);
  // let { from } = location.state || { from: { pathname: "/" } };
  let from = location.state?.from?.pathname || "/dashboard/home";
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const stepOneValidationSchema = Yup.object({
    Email: Yup.string().email().required().label("Email"),
    Password: Yup.string().required("This field is required"),
  });
  const stepTwoValidationSchema = Yup.object({
    Email: Yup.string().email().required().label("Email"),
  });
  const handleSubmit = async (values) => {
    await login(values.Email, values.Password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => (setErrorMessage(error.message), setAlert(true)));
  };
  const handleDemoLogin = async () => {
    await login(
      process.env.REACT_APP_DEMO_LOGIN,
      process.env.REACT_APP_DEMO_PASSWORD
    )
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => (setErrorMessage(error.message), setAlert(true)));
  };
  const handleReset = async (values) => {
    console.log("reseting password");
    await resetUserPassword(values.Email);
  };

  return (
    <div>
      <Page title="HR Core - Login">
        {isLoginScreen && (
          <Grid
            sx={{ p: 1, pb: 5, pt: 6 }}
            container
            columnSpacing={1}
            rowSpacing={1}
            direction="column"
            justifyContent="Center"
            alignItems="Center"
          >
            <Snackbar
              open={alert}
              autoHideDuration={5000}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                variant="filled"
                severity="error"
                onClose={() => setAlert(false)}
                sx={{ width: "100%", mt: 7 }}
              >
                {errorMessage}
              </Alert>
            </Snackbar>
            <Formik
              validationSchema={stepOneValidationSchema}
              onSubmit={handleSubmit}
              initialValues={{
                Email: "",
                Password: "",
              }}
            >
              {({ values, validateOnMount, resetForm }) => (
                <Form>
                  <Grid container>
                    <Box
                      sx={{
                        p: 1,
                        pb: 5,
                        pt: 6,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Card sx={{ minWidth: 380, p: 2 }}>
                        <Grid
                          container
                          direction="column"
                          justifyItems="center"
                          justifyContent="center"
                          alignItems="center"
                          rowGap={1}
                        >
                          <Grid item xs={12} xl={12}>
                            <Logo sx={{ width: 200, pb: 2 }} />
                          </Grid>

                          <Field
                            as={TextField}
                            label="Email"
                            type="email"
                            name="Email"
                            fullWidth
                            size="small"
                          />
                          <Grid item xs={12}>
                            <ErrorMessage name="Email" />
                          </Grid>
                          <Field
                            fullWidth
                            as={TextField}
                            label="Password"
                            type="password"
                            name="Password"
                            size="small"
                          />
                          <Grid item xs={12}>
                            <ErrorMessage name="Password" />
                          </Grid>
                        </Grid>
                        <Button
                          sx={{ width: "100%", mb: 2 }}
                          type="submit"
                          variant="contained"
                        >
                          Login
                        </Button>

                         <Button
                          variant="outlined"
                          fullWidth
                          onClick={() => handleDemoLogin()}
                          sx={{
                            width: "100%",
                            mb: 2,
                            color: "white",
                            backgroundImage: `linear-gradient(to right, #a28ae5, #af7be9, #c168e9, #d54de3, #eb12d8)`,
                          }}
                        >
                          Demo login
                        </Button> 

                        <Button
                          type="button"
                          onClick={() => setIsLoginScreen(!isLoginScreen)}
                        >
                          Forgot Password?
                        </Button>
                      </Card>
                    </Box>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        )}
        {!isLoginScreen && (
          <Grid
            sx={{ p: 1, pb: 5, pt: 6 }}
            container
            columnSpacing={1}
            rowSpacing={1}
            direction="column"
            justifyContent="Center"
            alignItems="Center"
          >
            <Formik
              validationSchema={stepTwoValidationSchema}
              onSubmit={handleReset}
              initialValues={{
                Email: "",
              }}
            >
              {({ values, validateOnMount }) => (
                <Form>
                  <Box
                    sx={{
                      p: 1,
                      pb: 5,
                      pt: 6,
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Card sx={{ width: 380 }}>
                      <Grid
                        sx={{ p: 1, pb: 5 }}
                        container
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                      >
                        <Grid item xs={12} xl={12}>
                          <Logo sx={{ width: 200, pb: 2 }} />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12}>
                          <Grid item sx={{ pb: 2 }}>
                            <Typography variant="outlined">
                              Get a reset link
                            </Typography>
                          </Grid>
                          <TextField
                            label="Email address"
                            type="email"
                            name="Email"
                            fullWidth
                            size="small"
                          />
                          <ErrorMessage name="Email" />
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: "100%", mb: 2, mt: 2 }}
                          >
                            Reset
                          </Button>
                          <Button
                            type="button"
                            onClick={() => setIsLoginScreen(!isLoginScreen)}
                          >
                            Back
                          </Button>
                        </Grid>
                      </Grid>
                    </Card>
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
        )}
      </Page>
    </div>
  );
};
export default Login;
