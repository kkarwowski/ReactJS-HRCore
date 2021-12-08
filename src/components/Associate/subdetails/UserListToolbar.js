import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";
import trash2Fill from "@iconify/icons-eva/trash-2-fill";
import roundFilterList from "@iconify/icons-ic/round-filter-list";
import LinearProgress from "@mui/material/LinearProgress";
import { useContext } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useAuth } from "../../../utils/context/AuthContext";
import { loadingContext } from "../../../utils/context/contexts";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";

// ----------------------------------------------------------------------
const Input = styled("input")({
  display: "none",
});

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
};

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
  onSelectFile,
  onDeleteFiles,
}) {
  const { loadingProgress } = useContext(loadingContext);
  const { isDemo } = useAuth();
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          size="small"
          value={filterName}
          onChange={onFilterName}
          placeholder="Search files..."
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
      )}

      <Box sx={{ width: "30%" }}>
        {loadingProgress > 1 && (
          <LinearProgress variant="determinate" value={loadingProgress} />
        )}
      </Box>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDeleteFiles}>
            <Icon icon={trash2Fill} color="red" />
          </IconButton>
        </Tooltip>
      ) : (
        <div>
          <label htmlFor="contained-button-file">
            <Input
              accept="*"
              type="file"
              id="contained-button-file"
              onChange={onSelectFile}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<FileUploadIcon />}
              disabled={isDemo}
            >
              Upload
            </Button>
          </label>
          <Tooltip title="Filter list">
            <IconButton>
              <Icon icon={roundFilterList} />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </RootStyle>
  );
}
