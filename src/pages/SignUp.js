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
import { Formik, Form } from "formik";
import React, { useContext } from "react";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignUp = () => {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    password1: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [newUser, setNewUser] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const { signup } = useAuth();
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const stepOneValidationSchema = Yup.object({
    Email: Yup.string().email().required().label("Email"),
  });
  const handleSubmit = (values) => {
    setNewUser(values);
  };
  return (
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={newUser}
      onSubmit={handleSubmit}
    >
      {({}) => (
        <Form>
          <Container>
            <Card fullWidth>
              <Grid
                sx={{ p: 1, pb: 5, pt: 6 }}
                container
                columnSpacing={2}
                rowSpacing={2}
                direction="column"
                justifyContent="Center"
                alignItems="Center"
                fullWidth
              >
                <Grid Item sx={12}>
                  <TextField
                    fullWidth
                    id="outlined-password-input"
                    label="Email"
                    type="email"
                  />
                </Grid>
                <FormControl sx={{ m: 1 }} variant="outlined">
                  <Grid Item sx={12}>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
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
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </Grid>
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="outlined">
                  <Grid Item sx={12}>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
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
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </Grid>
                </FormControl>
                <Grid Item sx={12}>
                  <Button type="submin" variant="outlined" fullWidth>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Container>
        </Form>
      )}
    </Formik>
  );
};
export default SignUp;
