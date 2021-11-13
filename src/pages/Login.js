import {
  Button,
  Input,
  Box,
  Grid,
  Container,
  FormControl,
  OutlinedInput,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  Card,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { useAuth } from "../utils/context/AuthContext";
import { Formik, Form, ErrorMessage, Field } from "formik";
import React from "react";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { login, currentUser, resetUserPassword } = useAuth();
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
    console.log("submit", values);
    await login(values.Email, values.Password);
    // resetForm();
  };
  const handleReset = async (values) => {
    console.log("reseting password");
    await resetUserPassword(values.Email);
  };
  return (
    <div>
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
          <Formik
            validationSchema={stepOneValidationSchema}
            onSubmit={handleSubmit}
            initialValues={{
              Email: "",
              Password: "",
            }}
          >
            {({ values, validateOnMount }) => (
              <Form>
                <Grid>
                  <Box sx={{ p: 1, pb: 5, pt: 6 }}>
                    <Card>
                      <Grid>
                        <Grid
                          sx={{ p: 1, pb: 5, pt: 6 }}
                          container
                          columnSpacing={1}
                          rowSpacing={1}
                          direction="column"
                          justifyItems="Center"
                          alignItems="Center"
                        >
                          <Grid item xs={12}>
                            <TextField
                              label="Email"
                              type="email"
                              name="Email"
                              fullWidth
                            />
                            <ErrorMessage name="Email" />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Password"
                              type="password"
                              name="Password"
                            />
                            <ErrorMessage name="Password" />
                          </Grid>
                        </Grid>
                        <Grid
                          sx={{ p: 1, pb: 3 }}
                          container
                          columnSpacing={1}
                          rowSpacing={1}
                          direction="column"
                          justifyContent="flex-end"
                          alignItems="flex-end"
                        >
                          <Grid item xs={12}>
                            <Button
                              type="button"
                              onClick={() => setIsLoginScreen(!isLoginScreen)}
                            >
                              Forgot Password?
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid
                          sx={{ p: 1, pb: 3 }}
                          container
                          columnSpacing={1}
                          rowSpacing={1}
                          direction="column"
                          justifyContent="Center"
                          alignItems="Center"
                        >
                          <Grid item xs={12} sm={12} lg={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              fullWidth={true}
                            >
                              Login
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Card>
                  </Box>
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
                      <Card sx={{ minWidth: 400 }}>
                        <Grid
                          sx={{ p: 1, pb: 5, pt: 6 }}
                          container
                          columnSpacing={1}
                          rowSpacing={1}
                          direction="column"
                          justifyItems="Center"
                          alignItems="Center"
                        >
                          <Grid item xs={12} sm={12} lg={12}>
                            <TextField
                              // style={{ width: "100%" }}
                              label="Email"
                              type="email"
                              name="Email"
                              fullWidth={true}
                            />
                            <ErrorMessage name="Email" />
                          </Grid>
                          <Grid item xs={12} sm={12} lg={12}>
                            <Button type="submit" variant="contained">
                              Reset
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={12} lg={12}>
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
          </Grid>
        </Box>
      )}
    </div>
  );
};
export default Login;
