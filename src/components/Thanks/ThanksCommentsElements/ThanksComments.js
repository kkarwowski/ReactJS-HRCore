import { Avatar, Typography, Grid, Divider, Box } from "@mui/material";
import React, { useContext } from "react";

import moment from "moment";
import { associatesContext } from "../../../utils/context/contexts";

const ThanksComments = ({ timestamp, comment, id }) => {
  const { associates, setAssociates } = useContext(associatesContext);
  const getUserDetails = (id) => {
    const associate = associates.filter((associatee) => associatee.id === id);
    return associate[0];
  };
  const user = getUserDetails(id);

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
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Box>
            <Typography variant="h7">{comment}</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ThanksComments;
