import React, { useEffect, useContext, useState } from "react";
import {
  Grid,
  Drawer,
  Box,
  Card,
  CardActions,
  Typography,
  Avatar,
  Divider,
  Skeleton,
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
import { useAuth } from "../../utils/context/AuthContext";
import Scrollbar from "../../components/Scrollbar";

import ThanksComments from "./ThanksCommentsElements/ThanksComments";
import ThanksCommentPost from "./ThanksCommentsElements/ThanksCommentPost";
const ThanksCard = ({ thanksId, thanksData, userId }) => {
  const [selectedThanks, setSelectedThanks] = useState({});
  const { userData } = useAuth();

  const [likesAndComments, setLikesAndComments] = useState();
  const { associates, setAssociates } = useContext(associatesContext);
  const [Liked, setLiked] = useState(false);
  const getUserDetails = (id) => {
    const associate = associates.filter((associatee) => associatee.id === id);
    return associate[0];
  };
  const fromUser = getUserDetails(thanksData.From);
  const toUser = getUserDetails(thanksData.To);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const toggleDrawer = (open) => {
    setShowSideMenu(open);
  };

  const getThanksLikesAndComments = () => {
    const ThanksLikesRef = doc(db, "Thanks-Comments-Likes", thanksId);
    onSnapshot(ThanksLikesRef, (result) => {
      if (result.data() != null) {
        const likesAndComments = result.data();

        setLikesAndComments(result.data());
        setSelectedThanks({
          thanksId,
          likesAndComments,
          thanksData,
        });
        if (result.data().Likes.includes(userId)) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      }
    });
  };
  useEffect(() => {
    getThanksLikesAndComments();
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
            <IconButton
              onClick={() =>
                toggleDrawer(true, thanksId, likesAndComments, thanksData)
              }
            >
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
      <Drawer
        // sx={{
        //   "& .MuiPaper-root": {
        //     position: "absolute",
        //     top: "50px",
        //   },
        // }}
        anchor="right"
        open={showSideMenu}
        onClose={() => setShowSideMenu(false)}
      >
        <Box sx={{ width: 350, padding: 1 }}>
          {selectedThanks && selectedThanks.likesAndComments != undefined && (
            <ThanksCommentPost
              count={
                Object.keys(selectedThanks.likesAndComments.Comments).length
              }
              thanksId={selectedThanks.thanksId}
              userId={userData.id}
            />
          )}
          <Box sx={{ height: "50%", width: 340 }}>
            <Scrollbar sx={{ height: "100%" }}>
              {selectedThanks &&
              selectedThanks.likesAndComments != undefined &&
              Object.keys(selectedThanks.likesAndComments.Comments).length >
                0 ? (
                // Object.keys(selectedThanks.likesAndComments.Comments).length >
                Object.entries(selectedThanks.likesAndComments.Comments)
                  // .sort((a, b) =>
                  //   new Date(
                  //     selectedThanks.likesAndComments.Comments[
                  //       b
                  //     ].Timestamp.toDate()
                  //   ) >
                  //   new Date(
                  //     selectedThanks.likesAndComments.Comments[
                  //       a
                  //     ].Timestamp.toDate()
                  //   )
                  //     ? 1
                  //     : -1
                  // )
                  .map(([key, value]) => {
                    return (
                      <ThanksComments
                        timestamp={value.Timestamp}
                        id={value.Id}
                        comment={value.Comment}
                        commentId={key}
                        thanksId={selectedThanks.thanksId}
                        userId={userId}
                      />
                    );
                  })
              ) : (
                <>
                  <Grid
                    container
                    direction="column"
                    alignContent="center"
                    alignItems="center"
                    rowGap={1}
                  >
                    <Grid item>
                      <Typography variant="overline">
                        No comments yet
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignContent="flex-start"
                        columnGap={2}
                        width="100%"
                      >
                        <Grid item>
                          <Skeleton
                            animation={false}
                            variant="circular"
                            width={30}
                            height={30}
                          />
                        </Grid>

                        <Grid item>
                          <Grid
                            container
                            direction="column"
                            rowGap={1}
                            alignContent="space-around"
                            width="100%"
                          >
                            <Grid item>
                              <Skeleton
                                variant="rectangular"
                                animation={false}
                                width={250}
                                height={10}
                              />
                            </Grid>
                            <Grid item>
                              <Skeleton
                                variant="rectangular"
                                animation={false}
                                width={160}
                                height={10}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
            </Scrollbar>
          </Box>
        </Box>
      </Drawer>

      <Card sx={{ maxWidth: 345 }}>
        <Box sx={{ display: "flex", flexDirection: "column", height: 400 }}>
          <CardActions>
            <Box>
              <ApprovalAvatar
                profilePicture={toUser.profilePicture}
                FirstName={toUser.FirstName}
                LastName={toUser.LastName}
                Title={toUser.Title}
                aheight={35}
                awidth={35}
              />
            </Box>
          </CardActions>

          <Box>
            <div className={thanksData.Category}>
              {thanksData.Category === "TeamPlayer"
                ? "Team Player 🤼"
                : thanksData.Category === "Hero"
                ? "Hero 🏅"
                : thanksData.Category === "ThankYou"
                ? "Thank you! 🙏"
                : thanksData.Category === "Knowledge"
                ? "Knowledge 💡"
                : ""}
            </div>
          </Box>
          <Box>
            <>
              <div className="comment_background">
                <div className="comment">{thanksData.Comment}</div>

                <div className="comment_giver">
                  <>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignContent="center"
                        alignItems="center"
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
                            <AccessTimeIcon
                              fontSize="small"
                              sx={{ opacity: 0.5 }}
                            />
                            <Typography
                              variant="h7"
                              sx={{ opacity: 0.5, paddingLeft: 1 }}
                            >
                              {thanksData.Timestamp &&
                                moment
                                  .unix(thanksData.Timestamp)
                                  .from(new Date())}
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
                                by
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
                  </>
                </div>
              </div>
            </>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box>
            <Divider variant="fullWidth" />
            <CardActions sx={{ paddingTop: 0.5, paddingBottom: 0.5 }}>
              {likesAndComments ? (
                <AllLikesAndComments
                  likesCount={Object.keys(likesAndComments.Likes).length}
                  commentCount={Object.keys(likesAndComments.Comments).length}
                />
              ) : (
                <AllLikesAndComments likesCount="0" commentCount="0" />
              )}
            </CardActions>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default ThanksCard;
