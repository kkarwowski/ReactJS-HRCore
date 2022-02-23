import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Drawer, Grid, Typography } from "@mui/material";
// components
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
import { MHidden } from "../../components/@material-extend";
import Logo from "../../components/Logo";
import sidebarConfig from "./SidebarConfig";
// import account from '../../_mocks_/account';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

// const AccountStyle = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(2, 2.5),
//   borderRadius: theme.shape.borderRadiusSm,
//   // backgroundColor: theme.palette.grey[200],
//   backgroundColor: theme.palette.third.main,
// }));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        {/* <Box> */}
        <Grid container direction="column" alignItems="center">
          <Logo sx={{ width: 90 }} color="white" />
        </Grid>
        {/* </Box> */}
      </Box>

      <NavSection navConfig={sidebarConfig} />

      <Box sx={{ flexGrow: 1 }}>
        {/* <Grid
          height="100%"
          container
          direction="row"
          alignContent="space-around"
          justifyItem="flex-end"
        >
          <Grid item>
            <Typography variant="h7" color="white">
              Version
            </Typography>
          </Grid>
        </Grid> */}
      </Box>
      <Box>
        <Grid container justifyContent="center" sx={{ pb: 2 }}>
          <Typography variant="h7" color="lightGrey">
            Version 0.75
          </Typography>
        </Grid>
      </Box>
      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{
            p: 2.5,
            pt: 2,
            borderRadius: 2,
            position: "relative",
            bgcolor: "grey.200",
          }}
        ></Stack>
      </Box> */}
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH, bgcolor: "third.main" },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              // bgcolor: "background.default",
              bgcolor: "third.main",
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
