import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../utils/context/AuthContext";
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

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { logout, userData } = useAuth();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
          <Avatar src={userData.profilePicture} />
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
            {userData ? userData.Title : null}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <MenuItem
          key={"Home"}
          to={`#`}
          component={RouterLink}
          onClick={handleClose}
          sx={{ typography: "body2", py: 1, px: 2.5 }}
        >
          <Box
            component={Icon}
            icon={homeFill}
            sx={{
              mr: 2,
              width: 24,
              height: 24,
            }}
          />
          {"Home"}
        </MenuItem>
        {userData && (
          <MenuItem
            key={"Profile"}
            to={`/dashboard/associates/${userData.id}`}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={personFill}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />
            {"Profile"}
          </MenuItem>
        )}
        <MenuItem
          key={"Settings"}
          to={`#`}
          component={RouterLink}
          onClick={handleClose}
          sx={{ typography: "body2", py: 1, px: 2.5 }}
        >
          <Box
            component={Icon}
            icon={settings2Fill}
            sx={{
              mr: 2,
              width: 24,
              height: 24,
            }}
          />
          {"Settings"}
        </MenuItem>

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
