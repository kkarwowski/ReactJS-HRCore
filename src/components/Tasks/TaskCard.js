import {
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
  CardHeader,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Box } from "@mui/system";
import ResponsiveAvatar from "../Associate/ResponsiveAvatar";
import {
  associatesContext,
  myDetailsContext,
} from "../../utils/context/contexts";

const TaskCard = ({ task }) => {
  const { associates, setAssociates } = useContext(associatesContext);

  const getAvatarSrc = (id) => {
    console.log(id, "id");
    const associate = associates.filter((associatee) => associatee.id === id);
    console.log(associate);
    return associate[0].profilePicture;
  };
  return (
    <Card>
      <CardHeader title={task.taskName} subheader={task.value} />
      <Grid
        container
        direction="column"
        spacing={3}
        sx={{
          p: 3,
          "& .MuiTextField-root": { m: 1, width: "35ch" },
        }}
      >
        <Grid item>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Avatar
                src={getAvatarSrc(task.manager)}
                alt="Profile Pic"
                sx={{ width: 30, height: 30 }}
              />
            </Grid>
            <Grid item>
              <Chip label="pending" color="warning" variant="outlined" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default TaskCard;
