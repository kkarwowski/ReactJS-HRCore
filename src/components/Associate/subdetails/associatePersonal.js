import {
  FormControl,
  MenuItem,
  TextField,
  Typography,
  Divider,
  Grid,
  Box,
  Button,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LoadingButton from "@mui/lab/LoadingButton";
import frLocale from "date-fns/locale/fr";
import Countries from "../../../utils/contries.json";
import LocalizationProvider from "@mui/lab/LocalizationProvider/";
import DatePicker from "@mui/lab/DatePicker";
import {
  associateContext,
  editedContext,
  officesContext,
  updateAssociatesContext,
  updatedAssociateContext,
} from "../../../utils/context/contexts";
import { useContext, useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import * as moment from "moment";
import SaveIcon from "@mui/icons-material/Save";

const AssociateInfo = () => {
  const { associateData, setAssociateData } = useContext(associateContext);
  const { allOffices } = useContext(officesContext);
  const { edited, setEdited } = useContext(editedContext);
  const { updatedAssociate, setUpdatedAssociate } = useContext(
    updatedAssociateContext
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateAssociates, setUpdateAssociates } = useContext(
    updateAssociatesContext
  );
  const CountriesArray = JSON.parse(JSON.stringify(Countries));

  useEffect(() => {
    const copyAssociate = async () => {
      setUpdatedAssociate(associateData);
    };
    copyAssociate();
  }, []);

  const onUpdate = (event) => {
    setEdited(true);
    setUpdatedAssociate({
      ...updatedAssociate,
      [event.target.name]: event.target.value,
    });
  };
  const onUpdateNested = (event) => {
    setEdited(true);
    setUpdatedAssociate({
      ...updatedAssociate,
      PostalAddress: {
        ...updatedAssociate.PostalAddress,
        [event.target.name]: event.target.value,
      },
    });
  };

  const updateFirebaseAndState = async () => {
    setIsUpdating(true);
    const result = await setDoc(
      doc(db, "Associates", `${associateData.id}`),
      updatedAssociate
    );
    setAssociateData(updatedAssociate);
    setEdited(false);
    setUpdateAssociates((updateAssociates) => updateAssociates + 1);
    setIsUpdating(false);
  };

  return (
    <Box sx={{ p: 0, pb: 1 }} dir="ltr">
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      ></Grid>
      <Typography variant="inherit">Personal</Typography>
      <Divider variant="middle" sx={{ pb: 2 }} />
      <FormControl>
        <Grid
          sx={{ p: 1, pb: 5, pt: 5 }}
          container
          columnSpacing={2}
          rowSpacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={3} xm={3}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="FirstName"
              label="First Name"
              defaultValue={associateData.FirstName}
              onChange={(e) => onUpdate(e)}
            />
          </Grid>
          <Grid item xs={3} xm={3}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="LastName"
              label="Last Name"
              defaultValue={associateData.LastName}
              onChange={(e) => onUpdate(e)}
            />
          </Grid>
          <Grid item xs={4} xm={4}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="Title"
              label="Title"
              defaultValue={associateData.Title}
              onChange={(e) => onUpdate(e)}
            />
          </Grid>
          <Grid item xs={3} xm={3}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="Department"
              label="Department"
              defaultValue={associateData.Department}
              onChange={(e) => onUpdate(e)}
            />
          </Grid>
          <Grid item xs={3} xm={3}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="PhoneNumber"
              label="Phone Number"
              defaultValue={associateData.PhoneNumber}
              onChange={(e) => onUpdate(e)}
            />
          </Grid>
          <Grid item xs={5} xm={5}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="WorkEmail"
              label="Work Email"
              defaultValue={associateData.WorkEmail}
              onChange={(e) => onUpdate(e)}
            />
          </Grid>
          <Grid item xs={5} xm={5}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="PrivateEmail"
              label="Private Email"
              defaultValue={associateData.PrivateEmail}
              onChange={(e) => onUpdate(e)}
            />
          </Grid>

          <Grid item item xs={3} xm={3}>
            <TextField
              style={{ width: "100%" }}
              value={associateData.EmplStatus}
              onChange={(e) => onUpdate(e)}
              select // tell TextField to render select
              name="EmplStatus"
              label="Employment Status"
            >
              <MenuItem key={1} value="Employed">
                Employed
              </MenuItem>
              <MenuItem key={2} value="Terminated">
                Terminated
              </MenuItem>
            </TextField>
          </Grid>
          {allOffices && (
            <Grid item>
              <TextField
                value={associateData.Office}
                onChange={(e) => onUpdate(e)}
                select // tell TextField to render select
                name="Office"
                id="Office1"
                label="Office"
              >
                {allOffices.map((office, index) => (
                  <MenuItem key={index} value={`${office}`}>
                    {office}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
          <Grid item>
            <TextField
              value={associateData.Gender}
              onChange={(e) => onUpdate(e)}
              select // tell TextField to render select
              name="Gender"
              label="Gender"
            >
              <MenuItem key={1} value="Male">
                Male
              </MenuItem>
              <MenuItem key={2} value="Female">
                Female
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                name="StartDate"
                value={associateData.StartDate}
                inputFormat="dd-MM-yyyy"
                onChange={(e) => onUpdate(e)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Termination Date"
                name="TerminationDate"
                disabled="true"
                value={
                  associateData.TerminationtDate
                    ? associateData.TerminationDate
                    : null
                }
                format="DD-MM-YYYY"
                onChange={(e) => onUpdate(e)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Typography variant="inherit">Postal Address</Typography>
        <Divider variant="middle" sx={{ pb: 3 }} />
        <Grid
          sx={{ p: 1, pt: 4, pb: 3 }}
          container
          columnSpacing={2}
          rowSpacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={5} xm={5}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="FirstLine"
              label="First line of the address"
              defaultValue={associateData.PostalAddress.FirstLine}
              onChange={(e) => onUpdateNested(e)}
            />
          </Grid>
          <Grid item xs={5} xm={5}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="SecondLine"
              label="Second line"
              defaultValue={associateData.PostalAddress.SecondtLine}
              onChange={(e) => onUpdateNested(e)}
            />
          </Grid>
          <Grid item xs={3} xm={3}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="Postcode"
              label="Postcode"
              defaultValue={associateData.PostalAddress.Postcode}
              onChange={(e) => onUpdateNested(e)}
            />
          </Grid>
          <Grid item xs={3} xm={3}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="City"
              label="City"
              defaultValue={associateData.PostalAddress.City}
              onChange={(e) => onUpdateNested(e)}
            />
          </Grid>
          <Grid item xs={3} xm={3}>
            <TextField
              defaultValue={associateData.PostalAddress.Country}
              onChange={(e) => onUpdateNested(e)}
              select // tell TextField to render select
              size="small"
              name="Country"
              label="Country"
            >
              {CountriesArray.map((country, index) => (
                <MenuItem key={index} value={`${country.name}`}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  );
};
export default AssociateInfo;
