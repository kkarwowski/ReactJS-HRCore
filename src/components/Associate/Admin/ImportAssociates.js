import { Button, Grid, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState, useContext } from "react";
import StyledDropzone from "./ImportCSVDropsozne";
import { Timestamp } from "firebase/firestore";
import { collection, addDoc, doc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { updateAssociatesContext } from "../../../utils/context/contexts";
import * as moment from "moment";

const ImportAssociates = () => {
  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState([]);
  const [loading, setLoading] = useState(false);
  var fileDownload = require("js-file-download");
  const { updateAssociates, setUpdateAssociates } = useContext(
    updateAssociatesContext
  );

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

    // setCsvArray(newArray);
    newArray.forEach((obj) => {
      console.log("new obj", obj);
      uploadToFirebase(obj);
    });
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
    // csvArray.forEach((obj) => {
    //   console.log("new obj", obj);
    //   uploadToFirebase(obj);
    // });
    setLoading(false);
  };

  const uploadToFirebase = async (ImportData) => {
    const docRef = await addDoc(collection(db, "Associates"), ImportData);
    console.log(docRef.id);
    setUpdateAssociates((updateAssociates) => updateAssociates + 1);
  };

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
          <Button>
            <a
              href={process.env.PUBLIC_URL + "/ImportTemplate.csv"}
              download="ImportTemplate.csv"
            >
              Download sample CSV
            </a>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default ImportAssociates;
