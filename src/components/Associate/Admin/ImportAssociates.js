import { Button, Grid, Box } from "@mui/material";
import fileDownload from "js-file-download";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import StyledDropzone from "./ImportCSVDropsozne";
const ImportAssociates = () => {
  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState([]);
  const [loading, setLoading] = useState(false);
  var fileDownload = require("js-file-download");
  const processCSV = (str, delim = ",") => {
    setLoading(true);
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const regHeaders = headers.slice(0, 12);
    const EmergencyHeaders = headers.slice(13, 17);
    const PostalHeaders = headers.slice(18, 22);

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
      console.log("row", row);

      const values = row.split("\r")[0].split(delim);
      const regValues = values.slice(0, 12);
      const postalValues = values.slice(18, 22);
      const emergencyValues = values.slice(13, 17);

      const firstObject = Object.assign.apply(
        {},
        regHeaders.map((v, i) => ({ [v]: regValues[i] }))
      );

      firstObject["PostalAddress"] = Object.assign.apply(
        {},
        newPostalHeaders.map((v, i) => ({ [v]: postalValues[i] }))
      );
      firstObject["EmergencyAddress"] = Object.assign.apply(
        {},
        newEmergencyHeaders.map((v, i) => ({ [v]: emergencyValues[i] }))
      );
      firstObject["profilePicture"] = "";

      return firstObject;
    });

    setCsvArray(newArray);
    setLoading(false);
  };

  const submit = () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      console.log(text);
      processCSV(text);
    };

    reader.readAsText(file);
  };

  const uploadToFirebaseAndState = () => {
    // Timestamp.fromDate(newData.DOB),
  };

  // emergencyInfo: {
  //   TelephoneNumber: "",
  //   LastName: "",
  //   FirstName: "",
  //   Relationship: "",
  // },
  // PostalAddress: {
  //   City: "",
  //   FirstLime: "",
  //   SecondLine: "",
  //   Postcode: "",
  //   Country: "",
  // },
  // profilePicture: "",
  // FirstName: "",
  // Title: "",
  // Department: "",
  // Manager: "",
  // PrivateEmail: "",
  // Office: "",
  // LastName: "",
  // EmplStatus: "",
  // StartDate: new Date(),
  // Gender: "",
  // WorkEmail: "",
  // City: "",
  // PhoneNumber: "",
  // DOB: new Date(),
  // Salary: "",
  // Notes: "",

  ////////

  return (
    <>
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
            disabled={!csvFile}
            loadingPosition="start"
            variant="contained"
            onClick={() => {
              submit();
            }}
          >
            Submit
          </LoadingButton>
        </Grid>

        <Grid item>
          <Button onClick={() => console.log(csvArray)}> Log</Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              fileDownload(
                process.env.PUBLIC_URL + "/ImportTemplate.csv",
                "filename.csv"
              );
            }}
          >
            Download Sample CSV
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default ImportAssociates;
