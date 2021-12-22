import React from "react";
import { Chip } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
const CategoryChip = ({ taskname }) => {
  const theme = useTheme();

  const styling = {
    "Title Change": {
      color: "#803849",
      backgroundColor: "#ffb7c8",

      fontSize: theme.typography.chip,
    },
    "Salary Increase": {
      color: "#845ec2",
      backgroundColor: "#fbeaff",
      fontSize: theme.typography.chip,
    },
  };

  return <Chip label={taskname} size="small" sx={styling[taskname]} />;
};

export default CategoryChip;
