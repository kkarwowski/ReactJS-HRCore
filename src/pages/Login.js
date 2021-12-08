import {
  Button,
  Box,
  Grid,
  Container,
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
const Login = () => {
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { login, resetUserPassword } = useAuth();
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
    await login(values.Email, values.Password).catch(
      (error) => (setErrorMessage(error.message), setAlert(true))
    );
  };
  const handleDemoLogin = async () => {
    await login(
      process.env.REACT_APP_DEMO_LOGIN,
      process.env.REACT_APP_DEMO_PASSWORD
    ).catch((error) => (setErrorMessage(error.message), setAlert(true)));
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
                  <Grid>
                    <Container maxWidth="md">
                      <Box
                        sx={{
                          p: 1,
                          pb: 5,
                          pt: 6,
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Card>
                          <Grid
                            container
                            direction="column"
                            justifyItems="center"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Grid item xs={12} xl={12}>
                              <Logo sx={{ width: 200 }} />
                            </Grid>
                            {/* <Grid item xs={12} xl={12}>
                            <CardMedia
                              component="img"
                              sx={{ width: 300 }}
                              image="/images/Data Arranging_Isometric.png"
                              alt="Logo"
                            />
                          </Grid> */}
                            <Grid item xs={12} xl={12}>
                              <Box>
                                {/* sx={{ display: "flex", flexDirection: "column" }} */}
                                {/* sx={{ flex: "0 1 auto" }} */}
                                <CardContent alignItems="center">
                                  <Grid>
                                    <Grid
                                      sx={{ p: 1, pb: 5, pt: 1 }}
                                      container
                                      columnSpacing={1}
                                      rowSpacing={1}
                                      direction="column"
                                      justifyItems="Center"
                                      alignItems="Center"
                                    >
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
                                      sx={{ width: "100%", mb: 2 }}
                                    >
                                      Demo
                                    </Button>

                                    <Button
                                      type="button"
                                      onClick={() =>
                                        setIsLoginScreen(!isLoginScreen)
                                      }
                                    >
                                      Forgot Password?
                                    </Button>
                                  </Grid>
                                </CardContent>
                              </Box>
                            </Grid>
                          </Grid>
                        </Card>
                      </Box>
                    </Container>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        )}
        {!isLoginScreen && (
          <Box sx={{ width: "100%" }}>
            <Grid
              sx={{ p: 1, pb: 5, pt: 6 }}
              container
              alignItems="center"
              justifyContent="Center"
              direction="column"
            >
              <Grid item xs={12} sm={12} lg={12}>
                <Formik
                  validationSchema={stepTwoValidationSchema}
                  onSubmit={handleReset}
                  initialValues={{
                    Email: "",
                  }}
                >
                  {({ values, validateOnMount }) => (
                    <Form>
                      <Box sx={{ p: 1, pb: 5, pt: 6, width: "1" }}>
                        <Card sx={{ p: 3 }}>
                          {/* <Grid
                          sx={{ p: 1, pb: 5, pt: 6 }}
                          container
                          columnSpacing={1}
                          rowSpacing={1}
                          direction="column"
                          justifyItems="Center"
                          alignItems="Center"
                        > */}
                          <Grid item>
                            <Typography variant="outlined">
                              Get a reset link
                            </Typography>
                          </Grid>
                          <TextField
                            // style={{ width: "100%" }}
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
                            sx={{ width: "100%", mb: 2, mb: 2, mt: 2 }}
                          >
                            Reset
                          </Button>
                          <Button
                            type="button"
                            onClick={() => setIsLoginScreen(!isLoginScreen)}
                          >
                            Back
                          </Button>
                          {/* </Grid> */}
                        </Card>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Box>
        )}
      </Page>
    </div>
  );
};
export default Login;
