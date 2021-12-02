import { useContext } from "react";
import { Box, Button, Grid } from "@mui/material";
import List from "@mui/material/List";
import { ListItem, TextField } from "@mui/material";

import { departmentsContext } from "../../../../utils/context/contexts";

const DepartmentsModify = () => {
  const { allDepartments } = useContext(departmentsContext);

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Grid container direction="rows" justify="flex-start">
        <Grid item xs={6} lg={6}>
          <List component="nav">
            {allDepartments.map((Dep) => {
              return (
                <ListItem key={Dep}>
                  <TextField
                    sx={{ pr: 2 }}
                    size="small"
                    sx={{ minWidth: "450" }}
                    defaultValue={Dep}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => console.log(Dep)}
                  >
                    Delete
                  </Button>
                  {/* <ListItemButton>ss</ListItemButton> */}
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={6} lg={6}>
          <TextField size="small" label="Add" />
        </Grid>
      </Grid>
    </Box>
  );
};
export default DepartmentsModify;
