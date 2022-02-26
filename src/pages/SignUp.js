import {
  Button,
  Box,
  Grid,
  FormControl,
  OutlinedInput,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Card,
  MenuItem,
} from "@mui/material";
import * as Yup from "yup";
import { useAuth } from "../utils/context/AuthContext";
import { Formik, Form } from "formik";
import React from "react";
import { useState, useContext } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { associatesContext } from "../utils/context/contexts";

const SignUp = () => {
  const { associates } = useContext(associatesContext);

  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [chosenProfile, setChosenProfile] = useState();
  const uploadToFirebase = async (associateID, role) => {
    const associate = associates.filter(
      (ass) => ass.AssociateID === associateID
    );
    // const formData = {
    //   AssociateID: associate.id,
    //   FirstName: associate.FirstName,
    //   LastName: associate.LastName,
    //   Role: role,
    // };
    // const docRef = await addDoc(collection(db, "Users"), formData);
  };
  // const { signup } = useAuth();
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
    console.log(chosenProfile);
    // await signup(newUser.Email.toString(), newUser.Password.toString());
    uploadToFirebase(chosenProfile.AssociateID, chosenProfile.Role);
  };
  const handleValues = (event) => {
    console.log(event.target.value);
    setChosenProfile({
      ...chosenProfile,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={newUser}
      onSubmit={handleSubmit}
    >
      {() => (
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
                  <Grid item xs={12} lg={12} sx={{ p: 1 }}>
                    <TextField
                      fullWidth={true}
                      select
                      label="Target Associate"
                      name="AssociateID"
                      onChange={handleValues}
                    >
                      {associates.map((associate) => (
                        <MenuItem key={associate.id} value={associate.id}>
                          {associate.FirstName} {associate.LastName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} lg={12} sx={{ p: 1 }}>
                    <TextField
                      fullWidth={true}
                      select
                      label="Role"
                      name="Role"
                      onChange={handleValues}
                    >
                      <MenuItem key={1} value={"Admin"}>
                        Admin
                      </MenuItem>
                      <MenuItem key={1} value={"Standard"}>
                        Standard
                      </MenuItem>
                    </TextField>
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
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
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
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
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
