import React, { useEffect, useState } from "react";
import { Grid, Container, Typography, Button } from "@mui/material";
import { useQuery } from "react-query";
import DepartmentGraph from "../components/Graphs/departmentGraph";
// import associatesjson from "../Offices.json"
// import { AssociatesService } from "../utils/DatabseServices";
import { DataUsageRounded } from "@mui/icons-material";
// import OfficeGraph from "../_dashboard/stats/officeGraph";
// import DepartmentGraph from "../_dashboard/stats/departmentGraph";
// import TotalEmployed from "../_dashboard/stats/TotalEmployed";
import { associatesContext } from "../utils/context/contexts";
import { useContext } from "react";
import { update } from "lodash";

const Home = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h3" pt={8} pb={5}>
        Hi, Welcome back
      </Typography>
      <Grid container spacing={3}>
        {/* {/* <Grid Grid item xs={12} sm={6} md={3}> */}
        {/* <TotalEmployed/>
        </Grid>
        <Grid Grid item xs={12} sm={6} md={3}>
          <TotalEmployed/>
        </Grid>
        <Grid Grid item xs={12} sm={6} md={3}>
          <TotalEmployed/>
        </Grid> */}
        {/* <Grid item xs={12} md={6} lg={4}>
          <OfficeGraph />
        </Grid> */}
        <Grid item xs={12} md={6} lg={4}>
          <DepartmentGraph />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
