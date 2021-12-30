import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

const associateProfileDetails = (props) => {
  return (
    <Box>
      <Box sx={{ p: 0, pb: 1 }} dir="ltr">
        <Grid
          container
          columnSpacing={2}
          rowSpacing={2}
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
        ></Grid>
      </Box>
    </Box>
  );
};

export default associateProfileDetails;
