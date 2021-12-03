import { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import List from "@mui/material/List";
import { ListItem, TextField } from "@mui/material";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../utils/firebase";

const DocCategoriesModify = () => {
  const [allCategories, setAllCategories] = useState();
  const getAllCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "DocumentCategories"));
    const all = querySnapshot.docs.map((doc) => doc.data().Name);
    setAllCategories(all);
  };
  useEffect(() => {
    const getCat = async () => {
      const data = await getAllCategories();
    };
    getCat();
  }, []);

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Grid container direction="rows" justify="flex-start">
        <Grid item xs={6} lg={6}>
          <List component="nav">
            {allCategories &&
              allCategories.map((Cat) => {
                return (
                  <ListItem key={Cat}>
                    <TextField
                      name={Cat}
                      sx={{ pr: 2, minWidth: 300 }}
                      size="small"
                      defaultValue={Cat}
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    />
                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => console.log(Cat)}
                    >
                      Delete
                    </Button>
                    {/* <ListItemButton>ss</ListItemButton> */}
                  </ListItem>
                );
              })}
            <ListItem key={"Add"}>
              <TextField
                name="Add"
                sx={{ pr: 2, minWidth: 300 }}
                size="small"
                defaultValue={""}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => console.log("Added")}
              >
                Add
              </Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DocCategoriesModify;
