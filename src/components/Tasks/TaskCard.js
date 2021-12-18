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
  Divider,
  Typography,
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
      <CardHeader
        title={task.taskName}
        subheader={("Proposed value: ", (<strong>{task.value}</strong>))}
      />
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
              <Grid container direction="rows" spacing={2} alignItems="center">
                <Grid item>
                  <Avatar
                    src={getAvatarSrc(task.manager)}
                    alt="Profile Pic"
                    sx={{ width: 30, height: 30 }}
                  />
                </Grid>

                <Grid item>{task.managerName}</Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Chip
                label={task.status}
                size="small"
                color={task.status === "pending" ? "warning" : "success"}
                variant={task.status === "pending" ? "outlined" : "contained"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Divider variant="fullWidth" sx={{ pb: 2 }} />
          <Grid
            container
            direction="row"
            spacing={2}
            justifyContent="space-between"
            sx={{ pt: 1 }}
          >
            <Grid item>
              <Typography variant="iherit">status:</Typography>
            </Grid>
            <Grid item>
              <Chip
                label={task.status}
                size="small"
                color={task.status === "pending" ? "warning" : "success"}
                variant={task.status === "pending" ? "outlined" : "contained"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default TaskCard;
