import { Grid, Chip, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../utils/firebase";
import { addNotification } from "../thanksFunctions";

const ThanksCommentPost = ({ count, thanksId, fromUser, toUser }) => {
  const [commentField, setCommentField] = useState();
  const presetComments = [
    "Well done!👍",
    "Awesome 😍",
    "Keep it up 💪",
    "Congratulations 🎉",
    "Good job 🤞",
    "Amazing work 😎",
  ];
  const postComment = () => {
    const thisUUID = uuidv4();
    const docREf = doc(db, `Thanks-Comments-Likes`, thanksId);
    updateDoc(docREf, {
      [`Comments.${thisUUID}`]: {
        Comment: commentField,
        Id: fromUser.id,
        Timestamp: Math.round(new Date().getTime() / 1000),
      },
    });
    addNotification(toUser.id, fromUser, "comment");
    setCommentField("");
  };

  return (
    <Grid container direction="column" sx={{ paddingBottom: 2 }}>
      <Grid item>
        Add comment
        <Grid container direction="column" paddingTop={3} rowSpacing={1}>
          <Grid item>
            <TextField
              label="Your comment"
              size="small"
              fullWidth
              rows={2}
              maxRows={3}
              onChange={(e) => setCommentField(e.target.value)}
              multiline
              InputLabelProps={{ shrink: commentField ? true : false }}
              value={commentField}
              //   onChange={(event) => setCommentField(event.value)}
            ></TextField>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                postComment();
              }}
              disabled={
                commentField === null ||
                commentField === undefined ||
                commentField === ""
              }
            >
              Post
            </Button>
          </Grid>
          <Grid item>
            <Typography paddingTop={1} paddingBottom={1}>
              Quick replies
            </Typography>
            <Grid
              container
              direction="row"
              rowGap={1}
              columnGap={1}
              // justifyContent="space-around"
              justifyContent="flex-start"
            >
              {presetComments.map((presetComment) => {
                return (
                  <Grid item>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        textTransform: "none",
                        color: "black",
                      }}
                      onClick={() => {
                        setCommentField(presetComment);
                      }}
                    >
                      {presetComment}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          columnGap={1}
          sx={{ paddingBottom: 1, paddingTop: 2 }}
        >
          <Typography>Comments</Typography>
          <Chip
            label={count}
            sx={{ color: "white", backgroundColor: "black" }}
            size="small"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ThanksCommentPost;
