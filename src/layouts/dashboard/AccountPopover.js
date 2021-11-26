import { Icon } from "@iconify/react";
import { useRef, useState, useEffect } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../utils/context/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
//

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: homeFill,
    linkTo: "/",
  },
  {
    label: "Profile",
    icon: personFill,
    linkTo: "#",
  },
  {
    label: "Settings",
    icon: settings2Fill,
    linkTo: "#",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { currentUser, logout, userData, setUserData } = useAuth();
  // const [userData, setUserData] = useState();

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const getUserData = async () => {
      const associateCollectionRef = doc(db, "Users", currentUser.uid);
      const data = await getDoc(associateCollectionRef);
      setUserData(data.data());
    };
    getUserData();
  }, []);
  return (
    <>
      {userData && (
        <IconButton
          ref={anchorRef}
          onClick={handleOpen}
          sx={{
            padding: 0,
            width: 44,
            height: 44,
            ...(open && {
              "&:before": {
                zIndex: 1,
                content: "''",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
          }}
        >
          <Avatar>
            {userData.FirstName.slice(0, 1)}
            {userData.LastName.slice(0, 1)}
          </Avatar>
        </IconButton>
      )}

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {userData ? userData.FirstName : null}{" "}
            {userData ? userData.LastName : null}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {currentUser ? currentUser.email : null}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
