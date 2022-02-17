import React from "react";
import {
  Grid,
  SvgIcon,
  Card,
  CardHeader,
  CardActions,
  TextField,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import commentO from "@iconify/icons-fa/comment-o";
import { Icon } from "@iconify/react";
import "./cardMedia.css";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
const ThanksCard = () => {
  const sampleComments = [
    {
      name: "Mark Jacobs",
      comment: "Congrats",
    },
    { name: "Erik Smith", comment: "Well deserved" },
  ];
  const [fav, setFav] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const LikesAndComments = () => {
    return (
      <>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          columnSpacing={1}
        >
          <Grid item>
            <LikeIcon
              sx={{ color: fav ? "red" : "black", window: 18, height: 18 }}
              status={fav}
            />
          </Grid>
          <Grid item>{2}</Grid>

          <Grid item>
            <IconButton>
              <Icon
                icon={commentO}
                color="black"
                width="18"
                height="18"
                onClick={() => handleExpandClick()}
              />
            </IconButton>
          </Grid>
          <Grid item>{2}</Grid>
        </Grid>
      </>
    );
  };

  function LikeIcon(props) {
    return (
      <IconButton
        onClick={() => {
          setFav(!fav);
        }}
      >
        <SvgIcon {...props}>
          {props.status === true ? (
            <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
          ) : (
            <path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z" />
          )}
        </SvgIcon>
      </IconButton>
    );
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title="asdasd" subheader="sdfsdfsfsdfdsf"></CardHeader>
        <div className="Container">
          <center>Team Player</center>
        </div>
        <CardActions>
          <LikesAndComments />
        </CardActions>
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
            {sampleComments.forEach((comment) => {
              return (
                <>
                  {comment.name}
                  {comment.comment}
                </>
              );
            })}
          </Grid>
        </Collapse>
      </Card>
    </>
  );
};

export default ThanksCard;
