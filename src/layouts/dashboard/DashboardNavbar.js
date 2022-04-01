import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
import { useLocation } from "react-router-dom";

// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Breadcrumbs,
} from "@mui/material";
// components
import { MHidden } from "../../components/@material-extend";
//
import Searchbar from "./Searchbar";
import AccountPopover from "./AccountPopover";
import NotificationsPopover from "./NotificationsPopover";
import { associatesContext } from "../../utils/context/contexts";
import { useContext } from "react";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 70;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  // backgroundColor: theme.palette.background.paper,
  backgroundColor: theme.palette.grey[100],
  borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,

  // 0.72
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const { associates, setAssciates } = useContext(associatesContext);

  const location = useLocation();
  let pathArray = location.pathname.split("/").filter((x) => x);
  const getAssociateDetails = (id) => {
    const associate = associates.filter((associatee) => associatee.id === id);
    return associate[0];
  };
  const associatedetails = getAssociateDetails(pathArray[2]);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <RootStyle>
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary" }}
          >
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>
        {/* <Grid container direction="rows" justifyContent="space-between"> */}
        {/* <Grid item> */}
        <Breadcrumbs aria-label="breadcrumb">
          {pathArray.length === 3 &&
          pathArray.includes("associates" && associatedetails)
            ? (pathArray[2] =
                associatedetails.FirstName + " " + associatedetails.LastName)
            : null}
          {pathArray.map((name, index) =>
            name === "givethanks" ? (
              <div key={name}>Give Thanks</div>
            ) : name === "newassociate" ? (
              <div key={name}>New Associate</div>
            ) : (
              <div key={name}>{capitalizeFirstLetter(name)}</div>
            )
          )}
        </Breadcrumbs>
        {/* <Searchbar /> */}

        {/* </Grid> */}

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          {/* <Grid item>
            <Grid container direction="rows" justifyContent="flex-end">
              <Grid item> */}
          <NotificationsPopover />
          {/* </Grid>

              <Grid item> */}
          <AccountPopover />
          {/* </Grid>
            </Grid> */}
          {/* </Grid> */}
          {/* </Grid> */}
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
