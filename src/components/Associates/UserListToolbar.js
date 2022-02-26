import PropTypes from "prop-types";
import * as React from "react";
import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";
// material
import { styled } from "@mui/material/styles";

import {
  Box,
  Switch,
  Toolbar,
  OutlinedInput,
  InputAdornment,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  setChecked: PropTypes.func,
  checked: PropTypes.bool,
};

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
  setChecked,
  checked,
}) {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      <SearchStyle
        size="small"
        value={filterName}
        onChange={onFilterName}
        placeholder="Search..."
        startAdornment={
          <InputAdornment position="start">
            <Box
              component={Icon}
              icon={searchFill}
              sx={{ color: "text.disabled" }}
            />
          </InputAdornment>
        }
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              sx={{ ml: 1 }}
              // defaultChecked={false}
              onChange={(event) => setChecked(event.target.checked)}
              checked={checked}
            />
          }
          label="Terminated"
        />
      </FormGroup>
    </RootStyle>
  );
}
