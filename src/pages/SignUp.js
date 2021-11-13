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
import { Formik, Form, ErrorMessage } from "formik";
import React, { useContext } from "react";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const { signup } = useAuth();
  const handleChange = (prop) => (event) => {
    setNewUser({ ...newUser, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const stepOneValidationSchema = Yup.object({
    Email: Yup.string().email().required().label("Email"),
    Password: Yup.string().required("This field is required"),
    ConfirmPassword: Yup.string().when("Password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    }),
  });
  const handleSubmit = async () => {
    console.log("submit");
    await signup(newUser.Email.toString(), newUser.Password.toString());
  };
  return (
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={newUser}
      onSubmit={handleSubmit}
    >
      {({}) => (
        <Form>
          <Box sx={{ p: 4, pb: 5, pt: 8 }}>
            <Grid
              // sx={{ p: 4, pb: 5, pt: 8 }}
              container
              // columnSpacing={2}
              // rowSpacing={2}
              direction="column"
              justifyContent="flex-end"
              justifyItems="center"
              alignItems="Center"
            >
              <Card>
                <Grid
                  sx={{ p: 4, pb: 5, pt: 8 }}
                  container
                  // columnSpacing={2}
                  rowSpacing={1}
                  direction="row"
                  justifyContent="center"
                  justifyItems="center"
                  alignItems="Center"
                >
                  <Grid item xs={12} lg={12} sx={{ p: 1 }}>
                    <TextField
                      fullWidth={true}
                      id="outlined-password-input"
                      label="Email"
                      type="email"
                      onChange={handleChange("Email")}
                    />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <FormControl
                      sx={{ m: 1 }}
                      variant="outlined"
                      fullWidth={true}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        fullWidth
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        value={newUser.Password}
                        onChange={handleChange("Password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <FormControl
                      sx={{ m: 1 }}
                      variant="outlined"
                      fullWidth={true}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        // style={{ width: "100%" }}

                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        value={newUser.ConfirmPassword}
                        onChange={handleChange("ConfirmPassword")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                    <Button type="submit" variant="contained" fullWidth={true}>
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
export default SignUp;
