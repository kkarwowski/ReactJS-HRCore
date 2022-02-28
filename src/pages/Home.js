import React, { useState, useEffect } from "react";
import {
  Grid,
  Fade,
  Typography,
  Card,
  Backdrop,
  Modal,
  Container,
  CardContent,
  CardMedia,
} from "@mui/material";
import DepartmentGraph from "../components/Graphs/departmentGraph";
import OfficeGraph from "../components/Graphs/officeGraph";
import TotalEmployed from "../components/Graphs/TotalEmployed";
import StarterTimeline from "../components/Timeline/starterTimeline";
import WelcomeCard from "../components/_dashboard/welcomeCard";
import BirthdayTimeline from "../components/Timeline/birthdayTimeline";
import TotalEmployedHistory from "../components/Graphs/TotalEmployedHistory";
import AverageSalary from "../components/Graphs/AverageSalary";
import Page from "../components/Page";
import { useAuth } from "../utils/context/AuthContext";
import MaleVSFemaleGraph from "../components/Graphs/MaleVSFemale";

const Home = () => {
  const { isDemo } = useAuth();

  const [isOpen, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(isDemo);
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "80vw", md: "40vw", lg: "40vw" },
    height: { xs: "80vh", md: "70vh", lg: "70vh" },
    bgcolor: "white",
    textAlign: "center",
    // border: "2px solid #000",
    boxShadow: 2,
    // p: 4,
  };
  return (
    <Page title="HR Core - Dashboard">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          {/* <Box sx={style}> */}
          <Card sx={style} onClick={handleClose}>
            <CardMedia component="img" height="60%" image="/images/demo.jpg" />
            <CardContent>
              <Container>
                <Typography variant="h3" sx={{ pb: { xs: 1, md: 2, lg: 2 } }}>
                  Welcome to Demo Mode!
                </Typography>
                Any changes made in this mode are done to State only.
                <br /> Firebase storage and database are read only.
              </Container>
            </CardContent>
          </Card>
          {/* </Box> */}
        </Fade>
      </Modal>
      <Container maxWidth="xl">
        <Grid container direction="row" spacing={3} sx={{ paddingTop: 1 }}>
          <Grid item xs={12} sm={7} md={7}>
            <WelcomeCard />
          </Grid>
          <Grid item xs={12} sm={5} md={5}>
            <TotalEmployedHistory />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={2}>
            <TotalEmployed />
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={3}></Grid> */}
          <Grid item xs={12} md={6} lg={3}>
            <OfficeGraph />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DepartmentGraph />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={2}>
            <MaleVSFemaleGraph />
          </Grid> */}

          <Grid item xs={12} md={6} lg={4}>
            <StarterTimeline />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <AverageSalary />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <BirthdayTimeline />
          </Grid>
          <Grid item xs={12} sm={5} md={2}>
            <TotalEmployed />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Home;
