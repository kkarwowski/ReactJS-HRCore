import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#a6a4a4";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  //   background-color: #fafafa;
  background-color: white;
  color: #bdbdbd;
  color: #a6a4a4;
  outline: none;
  transition: border 0.24s ease-in-out;
  min-height: 30vh;
  min-width: 50wh;
  cursor: pointer;
`;
const ContainerText = styled.div`
  margin: auto;
  top: 50%;
  left: 50%;
  text-align: center;
`;
function StyledDropzone(props) {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: ".csv",
    maxFiles: 1,
    onDrop: (files) => props.setCsvFile(files[0]),
  });
  const acceptedFileItems = acceptedFiles.map((file) => (
    <div>
      {file.path} - {file.size} bytes
    </div>
  ));
  return (
    <div className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <div className="container">
          Drag 'n' drop .csv file here, or click to select file.
          <br />
          <strong>
            Important - character "," is not allowed in the CSV file.
          </strong>
        </div>

        {acceptedFiles.length > 0 && (
          <>
            <h4>Accepted file</h4>
            {acceptedFileItems}
          </>
        )}
        <CloudUploadIcon sx={{ fontSize: 160, my: 2 }} />
      </Container>
    </div>
  );
}

export default StyledDropzone;
