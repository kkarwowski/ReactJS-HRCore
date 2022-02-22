import {
  Avatar,
  Typography,
  Grid,
  Divider,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../../utils/firebase";

import React, { useContext, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import moment from "moment";
import { associatesContext } from "../../../utils/context/contexts";

const ThanksComments = ({ timestamp, comment, id, commentId, thanksId }) => {
  const { associates, setAssociates } = useContext(associatesContext);
  const [edit, setEdit] = useState(false);
  const getUserDetails = (id) => {
    const associate = associates.filter((associatee) => associatee.id === id);
    return associate[0];
  };
  const user = getUserDetails(id);

  const deleteComment = (commentID, thanksId) => {
    const commentRef = doc(db, "Thanks-Comments-Likes", thanksId);
    // console.log(commentRef, "Comment REF");
    // console.log(commentID, idd, "ID");
    updateDoc(commentRef, {
      [`Comments.${commentID}`]: deleteField(),
    });
  };

  return (
    <>
      <Divider variant="fullWidth" />
      <Grid container direction="column" padding={1}>
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            columnSpacing={1}
          >
            <Grid item>
              {user && (
                <Avatar
                  src={user.profilePicture}
                  sx={{ width: 25, height: 25 }}
                />
              )}
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h7" sx={{ fontWeight: 600 }}>
                    {user.FirstName} {user.LastName}
                  </Typography>
                  <Typography
                    variant="h7"
                    sx={{ opacity: 0.5, paddingLeft: 1 }}
                  >
                    {moment.unix(timestamp).from(new Date())}
                  </Typography>
                  <IconButton onClick={() => setEdit(!edit)}>
                    <ModeEditIcon sx={{ width: 18, height: 18 }} />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteComment(commentId, thanksId)}
                  >
                    <DeleteForeverIcon sx={{ width: 18, height: 18 }} />
                  </IconButton>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {edit ? (
            <TextField
              variant="outlined"
              size="small"
              value={comment}
              inputProps={{ style: { fontSize: 12 } }}
            ></TextField>
          ) : (
            <Box>
              <Typography variant="h7">{comment}</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ThanksComments;
