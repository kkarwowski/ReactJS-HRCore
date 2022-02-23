import {
  Avatar,
  Typography,
  Grid,
  Divider,
  Box,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../../utils/firebase";

import React, { useContext, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import moment from "moment";
import { associatesContext } from "../../../utils/context/contexts";

const ThanksComments = ({
  timestamp,
  comment,
  id,
  commentId,
  thanksId,
  userId,
}) => {
  const { associates, setAssociates } = useContext(associatesContext);
  const [edit, setEdit] = useState(false);
  const [newComment, setNewComment] = useState();
  const getUserDetails = (id) => {
    const associate = associates.filter((associatee) => associatee.id === id);
    return associate[0];
  };
  const user = getUserDetails(id);
  const deleteComment = (commentID, thanksId) => {
    const commentRef = doc(db, "Thanks-Comments-Likes", thanksId);
    updateDoc(commentRef, {
      [`Comments.${commentID}`]: deleteField(),
    });
  };
  const editComment = (commentID, thanksId, newComment) => {
    const commentRef = doc(db, "Thanks-Comments-Likes", thanksId);
    updateDoc(commentRef, {
      [`Comments.${commentID}.Comment`]: newComment,
    });
    setEdit(false);
  };

  const pressEdit = () => {
    setNewComment(comment);
    setEdit(!edit);
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
                  {id === userId ? (
                    <>
                      <IconButton onClick={() => pressEdit()}>
                        <ModeEditIcon sx={{ width: 16, height: 16 }} />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteComment(commentId, thanksId)}
                      >
                        <DeleteForeverIcon sx={{ width: 16, height: 16 }} />
                      </IconButton>
                    </>
                  ) : null}
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {edit ? (
            <>
              <TextField
                variant="outlined"
                size="small"
                value={newComment ? newComment : ""}
                inputProps={{ style: { fontSize: 12 } }}
                fullWidth
                multiline
                onChange={(event) => setNewComment(event.target.value)}
                sx={{ borderColor: "yellow" }}
              ></TextField>
              <Button
                variant="contained"
                size="small"
                onClick={() => editComment(commentId, thanksId, newComment)}
              >
                Save
              </Button>
            </>
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
