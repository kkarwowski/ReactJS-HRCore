import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Card,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState, useContext } from "react";
import StyledDropzone from "./ImportCSVDropsozne";
import { Timestamp } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { updateAssociatesContext } from "../../../utils/context/contexts";
import * as moment from "moment";
import { useAuth } from "../../../utils/context/AuthContext";

import Page from "../../../components/Page";

const ImportAssociates = () => {
  const { isDemo, isAdmin } = useAuth();

  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState([]);
  const [loading, setLoading] = useState(false);
  var fileDownload = require("js-file-download");
  const { setUpdateAssociates } = useContext(updateAssociatesContext);

  const processCSV = (str, delim = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const regHeaders = headers.slice(0, 12);
    const EmergencyHeaders = headers.slice(13, 17);
    const PostalHeaders = headers.slice(17, 22);

    const newPostalHeaders = [];
    const newEmergencyHeaders = [];

    PostalHeaders.forEach((header) => {
      if (header === "PostalSecondLine\r") {
        newPostalHeaders.push(header.split("\r")[0].split("Postal")[1]);
      } else newPostalHeaders.push(header.split("Postal")[1]);
    });
    EmergencyHeaders.forEach((header) => {
      newEmergencyHeaders.push(header.split("Emergency")[1]);
    });
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    rows.splice(-1, 1);
    const newArray = rows.map((row) => {
      // console.log("row", row);

      const values = row.split("\r")[0].split(delim);
      const regValues = values.slice(0, 12);
      const postalValues = values.slice(17, 22);
      console.log(postalValues, "postal");
      const emergencyValues = values.slice(13, 17);
      const DOB = moment(values.slice(23, 24), "DD/MM/YYYY").toDate();

      console.log(DOB, "DOB");
      console.log(values.slice(23, 24), "DOB");
      const StartDate = moment(values.slice(12, 13), "DD/MM/YYYY").toDate();

      const firstObject = Object.assign.apply(
        {},
        regHeaders.map((v, i) => ({ [v]: regValues[i] }))
      );

      firstObject["PostalAddress"] = Object.assign.apply(
        {},
        newPostalHeaders.map((v, i) => ({ [v]: postalValues[i] }))
      );
      firstObject["emergencyInfo"] = Object.assign.apply(
        {},
        newEmergencyHeaders.map((v, i) => ({ [v]: emergencyValues[i] }))
      );
      firstObject["profilePicture"] = "";

      firstObject["DOB"] = Timestamp.fromDate(DOB);
      firstObject["StartDate"] = Timestamp.fromDate(StartDate);
      return firstObject;
    });

    setCsvArray(newArray);
    // newArray.forEach((obj) => {
    //   console.log("new obj", obj);
    //   uploadToFirebase(obj);
    // });
  };

  const submit = () => {
    setLoading(true);

    const file = csvFile;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (e) {
      const text = e.target.result;
      // console.log(text);
      processCSV(text);
    };
    csvArray.forEach((obj) => {
      console.log("new obj", obj);
      uploadToFirebase(obj);
    });
    setLoading(false);
  };

  const uploadToFirebase = async (ImportData) => {
    const docRef = await addDoc(collection(db, "Associates"), ImportData);
    console.log(docRef.id);
    setUpdateAssociates((updateAssociates) => updateAssociates + 1);
  };

  return (
    <>
      <Page title="HR Core - Import">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyItems="center"
          spacing={2}
        >
          <Grid item>
            <StyledDropzone setCsvFile={setCsvFile} />
          </Grid>

          <Grid item>
            <LoadingButton
              loading={loading}
              disabled={!csvFile || isDemo}
              variant="contained"
              onClick={() => {
                submit();
              }}
            >
              Submit
            </LoadingButton>
          </Grid>
          {isDemo && <Typography>Button disabled in Demo mode</Typography>}
          {/* <Grid item> */}
          {/* <Button onClick={() => console.log(csvArray)}> Log</Button> */}
          {/* </Grid> */}
          <Grid item>
            <Button>
              <a
                href={process.env.PUBLIC_URL + "/ImportTemplate.csv"}
                download="ImportTemplate.csv"
              >
                Download sample CSV
              </a>
            </Button>
          </Grid>
          {csvArray.length > 1 && (
            <TableContainer component={Card} sx={{ p: 2, mx: 2 }}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">First Name</TableCell>
                    <TableCell align="left">Last Name</TableCell>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="left">Department</TableCell>
                    <TableCell align="left">Gender</TableCell>
                    <TableCell align="left">Employement Status</TableCell>
                    <TableCell align="left">Salary&nbsp;(£)</TableCell>
                    <TableCell align="left">Manager</TableCell>
                    <TableCell align="left">Office</TableCell>
                    <TableCell align="left">DOB</TableCell>
                    <TableCell align="left">Phone Number</TableCell>
                    <TableCell align="left">Private Email</TableCell>
                    <TableCell align="left">Work Email</TableCell>
                    <TableCell align="left">Start Date</TableCell>
                    <TableCell align="left">Eme. First Name</TableCell>
                    <TableCell align="left">Eme. Last Name</TableCell>
                    <TableCell align="left">Eme. Relationship</TableCell>
                    <TableCell align="left">Eme. Phone num</TableCell>
                    <TableCell align="left">Postal City</TableCell>
                    <TableCell align="left">Postal Country</TableCell>
                    <TableCell align="left">Postal 1st Line</TableCell>
                    <TableCell align="left">Postal Post code</TableCell>
                    <TableCell align="left">Postal 2nd Line</TableCell>
                    <TableCell align="left">Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {csvArray.map((row) => (
                    <TableRow
                      key={row.LastName}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {/* <TableCell component="th" scope="row">
                      {row.FirstName}
                    </TableCell> */}
                      <TableCell align="left">{row.FirstName}</TableCell>
                      <TableCell align="left">{row.LastName}</TableCell>
                      <TableCell align="left">{row.Title}</TableCell>
                      <TableCell align="left">{row.Department}</TableCell>
                      <TableCell align="left">{row.Gender}</TableCell>
                      <TableCell align="left">{row.EmplStatus}</TableCell>
                      <TableCell align="left">{row.Salary}</TableCell>
                      <TableCell align="left">{row.Manager}</TableCell>
                      <TableCell align="left">{row.Office}</TableCell>
                      <TableCell align="left">
                        {moment(row.DOB.toDate()).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="left">{row.PhoneNumber}</TableCell>
                      <TableCell align="left">{row.PrivateEmail}</TableCell>
                      <TableCell align="left">{row.WorkEmail}</TableCell>
                      <TableCell align="left">
                        {moment(row.StartDate.toDate()).format("DD/MM/YYYY")}
                      </TableCell>
                      {Object.entries(row.emergencyInfo).map(([key, value]) => {
                        return <TableCell align="left">{value}</TableCell>;
                      })}
                      {Object.entries(row.PostalAddress).map(([key, value]) => {
                        return <TableCell align="left">{value}</TableCell>;
                      })}
                      <TableCell align="left">{row.Notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Page>
    </>
  );
};
export default ImportAssociates;
