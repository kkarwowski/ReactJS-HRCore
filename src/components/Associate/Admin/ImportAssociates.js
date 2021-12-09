import { Button } from "@mui/material";
import { indexOf } from "lodash";
import { useState } from "react";
const ImportAssociates = () => {
  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState([]);

  const processCSV = (str, delim = ",") => {
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
      return firstObject;
    });

    setCsvArray(newArray);
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

  return (
    <>
      <h1>Import</h1>
      <form id="csv-form">
        <input
          type="file"
          accept=".csv"
          id="csvFile"
          onChange={(e) => {
            setCsvFile(e.target.files[0]);
          }}
        ></input>
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (csvFile) submit();
          }}
        >
          Submit
        </button>
        <br />
        <br />
        {csvArray.length > 0 ? (
          <>
            <table>
              <thead>
                <th>Name</th>
                <th>Age</th>
                <th>Rank</th>
              </thead>
              <tbody>
                {csvArray.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.rank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}
      </form>
      <Button onClick={() => console.log(csvArray)}> Log</Button>
    </>
  );
};
export default ImportAssociates;
