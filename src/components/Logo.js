import PropTypes from "prop-types";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return <Box component="img" src="/images/hr core logo .png" sx={{ ...sx }} />;
}
