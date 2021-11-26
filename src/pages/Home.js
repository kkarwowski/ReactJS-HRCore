import React, { useEffect, useState } from "react";
import { Grid, Container, Typography, Button } from "@mui/material";
import DepartmentGraph from "../components/Graphs/departmentGraph";
import OfficeGraph from "../components/Graphs/officeGraph";
import TotalEmployed from "../components/Graphs/TotalEmployed";
import StarterTimeline from "../components/Timeline/starterTimeline";
import WelcomeCard from "../components/_dashboard/welcomeCard";
import BirthdayTimeline from "../components/Timeline/birthdayTimeline";
import TotalEmployedHistory from "../components/Graphs/TotalEmployedHistory";
import AverageSalary from "../components/Graphs/AverageSalary";
const Home = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid Grid item xs={12} sm={7} md={7}>
          <WelcomeCard />
        </Grid>
        <Grid Grid item xs={12} sm={5} md={5}>
          <TotalEmployedHistory />
        </Grid>
        <Grid Grid item xs={12} sm={5} md={3}>
          <TotalEmployed />
        </Grid>
        <Grid Grid item xs={12} sm={6} md={3}>
          <AverageSalary />
        </Grid>
        <Grid Grid item xs={12} sm={6} md={3}>
          <TotalEmployed />
        </Grid>
        <Grid item xs={12} md={6} lg={3}></Grid>
        <Grid item xs={12} md={6} lg={3}>
          <OfficeGraph />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DepartmentGraph />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StarterTimeline />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <BirthdayTimeline />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
