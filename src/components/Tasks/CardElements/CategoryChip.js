import React from "react";
import { Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const CategoryChip = ({ taskname }) => {
  const theme = useTheme();

  const styling = {
    "Title Change": {
      color: "#803849",
      backgroundColor: "#ffd4de",
      fontSize: theme.typography.chip,
    },
    "Salary Increase": {
      color: "#845ec2",
      backgroundColor: "#fbeaff",
      fontSize: theme.typography.chip,
    },
  };
  // blue
  //   color: "#007e97",
  //       backgroundColor: "#ccf6fe",

  // greem

  //   color: "#005043",
  //       backgroundColor: "#99e9dc",
  return (
    <Chip
      label={taskname === "Salary Increase" ? taskname + " 💰" : taskname}
      size="small"
      sx={styling[taskname]}
    />
  );
};

export default CategoryChip;
