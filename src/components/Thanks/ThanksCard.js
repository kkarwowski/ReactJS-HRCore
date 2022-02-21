import React, { useEffect, useContext, useState } from "react";
import {
  Grid,
  Card,
  CardActions,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import {
  doc,
  arrayRemove,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import IconButton from "@mui/material/IconButton";

import ApprovalAvatar from "../Tasks/approverTimeline/approvalAvatar";
import "./ThanksCardElements/cardMedia.css";
import { LikeIcon } from "./ThanksCardElements/LikeIcon";
import { associatesContext } from "../../utils/context/contexts";
import { db } from "../../utils/firebase";
import { thanksCommentsContext } from "../../utils/context/contexts";

const ThanksCard = ({
  thanksId,
  thanksData,
  userId,
  toggleDrawer,
  giveThanksMode,
}) => {
  const { selectedCommentsandLikes, setSelectedCommentsandLikes } = useContext(
    thanksCommentsContext
  );
  const [likesAndComments, setLikesAndComments] = useState();
  const { associates, setAssociates } = useContext(associatesContext);
  const [Liked, setLiked] = useState(false);
  console.log(thanksData, "data");
  const getUserDetails = (id) => {
    const associate = associates.filter((associatee) => associatee.id === id);
    return associate[0];
  };
  const fromUser = getUserDetails(thanksData.From);
  const toUser = getUserDetails(thanksData.To);

  useEffect(() => {
    if (!giveThanksMode) {
      const ThanksLikesRef = doc(db, "Thanks-Comments-Likes", thanksId);
      onSnapshot(ThanksLikesRef, (result) => {
        if (result.data() != null) {
          setLikesAndComments(result.data());
          setSelectedCommentsandLikes(result.data());
          if (result.data().Likes.includes(userId)) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        }
      });
    }
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

  const AllLikesAndComments = ({ likesCount, commentCount }) => {
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
            {!giveThanksMode ? (
              <LikeIcon
                function={() => {
                  handleLikePress();
                }}
                sx={{ color: Liked ? "red" : "black", window: 18, height: 18 }}
                status={Liked}
              />
            ) : (
              <LikeIcon
                sx={{ color: Liked ? "red" : "black", window: 18, height: 18 }}
                status={Liked}
              />
            )}
          </Grid>
          <Grid item>{likesCount}</Grid>
          <Grid item>
            {!giveThanksMode ? (
              <IconButton
                onClick={() =>
                  toggleDrawer(true, thanksId, likesAndComments, thanksData)
                }
              >
                <Typography>Comments</Typography>
              </IconButton>
            ) : (
              <IconButton>
                <Typography>Comments</Typography>
              </IconButton>
            )}
          </Grid>
          <Grid item>{commentCount}</Grid>
        </Grid>
      </>
    );
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <div className={thanksData.Category}>
        {thanksData.Category === "TeamPlayer"
          ? "Team Player 🤼"
          : thanksData.Category === "Hero"
          ? "Hero 🥉"
          : thanksData.Category === "ThankYou"
          ? "Thank you! 🙏"
          : ""}
      </div>
      <Grid
        container
        direction="column"
        // justifyContent="center"
        justifyContent="space-around"
      >
        <Grid item>
          <CardActions>
            <Grid container direction="column" rowSpacing={1}>
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
                      justifyContent="flex-end"
                      alignItems="center"
                      columnSpacing={1}
                      paddingLeft={1}
                    >
                      <AccessTimeIcon fontSize="small" sx={{ opacity: 0.5 }} />
                      <Typography
                        variant="h7"
                        sx={{ opacity: 0.5, paddingLeft: 1 }}
                      >
                        {thanksData.Timestamp &&
                          moment.unix(thanksData.Timestamp).from(new Date())}
                      </Typography>
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
            </Grid>
          </CardActions>
        </Grid>
        <Grid item>
          <Divider variant="fullWidth" />
          {/* <Box height={200}>sdfsdf</Box> */}
          <CardActions>
            {likesAndComments ? (
              <AllLikesAndComments
                likesCount={Object.keys(likesAndComments.Likes).length}
                commentCount={Object.keys(likesAndComments.Comments).length}
              />
            ) : (
              <AllLikesAndComments likesCount="0" commentCount="0" />
            )}
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ThanksCard;
