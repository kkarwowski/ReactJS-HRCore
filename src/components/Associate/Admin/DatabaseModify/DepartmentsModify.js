import { useContext } from "react";
import { Box, Button } from "@mui/material";
import List from "@mui/material/List";
import { ListItem, TextField } from "@mui/material";

import { departmentsContext } from "../../../../utils/context/contexts";

const DepartmentsModify = () => {
  const { allDepartments } = useContext(departmentsContext);

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav">
        {allDepartments.map((Dep) => {
          return (
            <ListItem key={Dep}>
              <TextField
                size="small"
                defaultValue={Dep}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <Button
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
    </Box>
  );
};
export default DepartmentsModify;
