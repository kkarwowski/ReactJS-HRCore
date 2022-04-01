import React, { useEffect, useState } from "react";
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
import { db } from "../../utils/firebase";
import { useAuth } from "../../utils/context/AuthContext";
import Scrollbar from "../../components/Scrollbar";
import { addNotification } from "./thanksFunctions";
import ThanksComments from "./ThanksCommentsElements/ThanksComments";
import ThanksCommentPost from "./ThanksCommentsElements/ThanksCommentPost";
import { GetAssociateDetails } from "../../utils/getAssociateDetails";
const ThanksCard = ({ thanksId, thanksData, userId }) => {
  const [selectedThanks, setSelectedThanks] = useState({});
  const { userData } = useAuth();

  const [likesAndComments, setLikesAndComments] = useState();
  const [Liked, setLiked] = useState(false);

  const fromUser = GetAssociateDetails(thanksData.From);
  const toUser = GetAssociateDetails(thanksData.To);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const toggleDrawer = (open) => {
    setShowSideMenu(open);
  };

  const getThanksLikesAndComments = () => {
    const ThanksLikesRef = doc(db, "Thanks-Comments-Likes", thanksId);
    onSnapshot(ThanksLikesRef, (result) => {
      if (result.data() !== null) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLikePress = () => {
    if (Liked) {
      updateDoc(doc(db, "Thanks-Comments-Likes", thanksId), {
        Likes: arrayRemove(userId),
      });
    } else {
      updateDoc(doc(db, "Thanks-Comments-Likes", thanksId), {
        Likes: arrayUnion(userId),
      });
      addNotification(toUser.id, userData, "liked");
    }
    setLiked(!Liked);
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
              onClick={() => {
                handleLikePress();
              }}
              sx={{ color: Liked ? "red" : "black", window: 15, height: 15 }}
              status={Liked.toString()}
            />
          </Grid>
          <Grid item>
            <Typography variant="caption">{likesCount}</Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() =>
                toggleDrawer(true, thanksId, likesAndComments, thanksData)
              }
            >
              <Typography variant="caption">Comments</Typography>
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="caption">{commentCount}</Typography>
          </Grid>
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
          {selectedThanks && selectedThanks.likesAndComments !== undefined && (
            <ThanksCommentPost
              count={
                Object.keys(selectedThanks.likesAndComments.Comments).length
              }
              thanksId={selectedThanks.thanksId}
              fromUser={userData}
              toUser={toUser}
            />
          )}
          <Box sx={{ height: "50%", width: 340 }}>
            <Scrollbar sx={{ height: "100%" }}>
              {selectedThanks &&
              selectedThanks.likesAndComments !== undefined &&
              Object.keys(selectedThanks.likesAndComments.Comments).length >
                0 ? (
                // Object.keys(selectedThanks.likesAndComments.Comments).length >
                Object.entries(selectedThanks.likesAndComments.Comments)
                  // .sort(( a ,  b ) =>
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
                        key={key}
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

      <Card
        sx={{
          maxWidth: { xs: 345, md: 345, lg: 400 },
          minWidth: { xs: 345, md: "50%", lg: "30%" },
        }}
      >
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
              {/* <div className={thanksData.Category} style={{ minHeight: 80 }}> */}
              {thanksData.Category === "TeamPlayer"
                ? "Team Player 👍"
                : thanksData.Category === "Hero" && toUser.Gender === "Male"
                ? "Superhero 🦸‍♂️"
                : thanksData.Category === "Hero" && toUser.Gender === "Female"
                ? "Superhero 🦸‍♀️"
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
                              // fontSize="small"
                              sx={{ opacity: 0.5, width: 12 }}
                            />
                            <Typography
                              variant="h7"
                              sx={{ opacity: 0.5, paddingLeft: 1 }}
                            >
                              {thanksData.Timestamp &&
                                moment(thanksData.Timestamp)
                                  // .unix(thanksData.Timestamp)
                                  .from(new Date())}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid item>
                          <Grid
                            container
                            direction="row"
                            alignContent="center"
                            justifyContent="flex-end"
                            columnSpacing={1}
                          >
                            <Grid item>
                              <Typography
                                variant="h7"
                                sx={{ paddingLeft: 0.5 }}
                              >
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
