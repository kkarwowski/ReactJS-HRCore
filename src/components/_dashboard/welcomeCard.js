import {
  Card,
  Typography,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Button,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export default function WelcomeCard() {
  const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: "none",
    // textAlign: "center",
    padding: theme.spacing(4, 4),
    color: theme.palette.secondary.darker,
    backgroundColor: theme.palette.secondary.lighter,
  }));
  return (
    <RootStyle>
      <Grid
        container
        direction="rows"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={6} lg={6}>
          <Grid container direction="column" justifyContent="flex-start">
            <Grid item>
              <Typography variant="h4">Welcome to</Typography>
              <Typography variant="h4">HR Core!</Typography>
            </Grid>

            <Grid item sx={{ pt: 2, pb: 2 }}>
              <Typography variant="h6">
                Start managing your employees from anywhere! Easy to use,
                intiutive interface with automation in mind.
              </Typography>
            </Grid>

            <Grid item sx={{ p: 2 }}>
              <Button variant="contained">Discover</Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6} lg={6}>
          <Grid container direction="rows" justifyContent="flex-end">
            <CardMedia
              component="img"
              sx={{ width: 250 }}
              image="/images/Online presentation_Monochromatic.png"
              alt="Logo"
            />
          </Grid>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
