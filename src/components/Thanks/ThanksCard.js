import React, { useEffect, useContext, useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  TextField,
  Button,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  arrayRemove,
  where,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import moment from "moment";
import { associatesContext } from "../../utils/context/contexts";

import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import commentO from "@iconify/icons-fa/comment-o";
import { Icon } from "@iconify/react";
import "./ThanksCardElements/cardMedia.css";
import Collapse from "@mui/material/Collapse";
import { LikeIcon } from "./ThanksCardElements/LikeIcon";
import ApprovalAvatar from "../Tasks/approverTimeline/approvalAvatar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ThanksCard = ({
  thanksId,
  thanksData,
  userId,
  commentButton,
  setSelectedThanks,
}) => {
  const [likesAndComments, setLikesAndComments] = useState();
  const { associates, setAssociates } = useContext(associatesContext);
  const [Liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const getUserDetails = (id) => {
    const associate = associates.filter((associatee) => associatee.id === id);
    return associate[0];
  };
  console.log(thanksData, "data");
  const fromUser = getUserDetails(thanksData.From);
  const toUser = getUserDetails(thanksData.To);
  useEffect(() => {
    const ThanksCommentsLikesRef = doc(db, "Thanks-Comments-Likes", thanksId);
    onSnapshot(ThanksCommentsLikesRef, (result) => {
      if (result.data() != null) {
        setLikesAndComments(result.data());
        if (result.data().Likes.includes(userId)) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      }
    });
  }, []);

  const handleLikePress = () => {
    if (Liked) {
      updateDoc(doc(db, "Thanks-Comments-Likes", thanksId), {
        Likes: arrayRemove(userId),
      });
      setLiked(!Liked);
    } else {
      updateDoc(doc(db, "Thanks-Comments-Likes", thanksId), {
        Likes: arrayUnion(userId),
      });
      setLiked(!Liked);
    }
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const LikesAndComments = ({ likesCount, commentCount }) => {
    return (
      <>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          columnSpacing={0.5}
        >
          <Grid item>
            <LikeIcon
              function={() => {
                handleLikePress();
              }}
              sx={{ color: Liked ? "red" : "black", window: 18, height: 18 }}
              status={Liked}
            />
          </Grid>
          <Grid item>{likesCount}</Grid>

          <Grid item>
            {/* <IconButton onClick={() => handleExpandClick()}> */}
            <IconButton onClick={() => commentButton("right", true, "test")}>
              {/* <Icon icon={commentO} color="black" width="18" height="18" /> */}
              <Typography>Comments</Typography>
            </IconButton>
          </Grid>
          <Grid item>{commentCount}</Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        {/* <CardHeader title="asdasd" subheader="sdfsdfsfsdfdsf"></CardHeader> */}
        <div className="Container">Team Player 🤼</div>

        <CardActions>
          <Grid container direction="column" rowSpacing={1}>
            {console.log(toUser, "toUser")}
            <Grid item>
              {toUser && (
                <ApprovalAvatar
                  profilePicture={toUser.profilePicture}
                  FirstName={toUser.FirstName}
                  LastName={toUser.LastName}
                  Title={toUser.Title}
                  comment={thanksData.Comment}
                  aheight={35}
                  awidth={35}
                />
              )}
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignContent="center"
              >
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    alignContent="center"
                    columnSpacing={1}
                  >
                    <Grid item>
                      <AccessTimeIcon fontSize="small" sx={{ opacity: 0.5 }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h7" sx={{ opacity: 0.5 }}>
                        {thanksData.Timestamp &&
                          moment.unix(thanksData.Timestamp).from(new Date())}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    columnSpacing={1}
                  >
                    <Grid item>
                      <Typography variant="h7" sx={{ p: 1 }}>
                        From
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Avatar
                        src={fromUser.profilePicture}
                        sx={{ width: 25, height: 25 }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h7">
                        {fromUser.FirstName} {fromUser.LastName}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item>{toUser && <Avatar src={toUser.profilePicture} />}</Grid> */}
            {/* <Grid item>
              <Typography variant="tinyRegular">
                {thanksData.Comment}
              </Typography>
            </Grid> */}
          </Grid>
        </CardActions>
        <Divider variant="fullWidth" />
        <CardActions>
          {likesAndComments ? (
            <LikesAndComments
              likesCount={Object.keys(likesAndComments.Likes).length}
              commentCount={Object.keys(likesAndComments.Comments).length}
            />
          ) : (
            <LikesAndComments likesCount="0" commentCount="0" />
          )}
        </CardActions>
        {/* <CardActions>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            sx={{ padding: 1 }}
          >
            <Grid container direction="row">
              <Grid item>
                <TextField size="small" maxRows={2} />
              </Grid>
              <Grid item>
                <Button variant="contained" endIcon={<SendIcon />}>
                  Send
                </Button>
              </Grid>
            </Grid>
          </Collapse>
        </CardActions> */}
      </Card>
    </>
  );
};

export default ThanksCard;
