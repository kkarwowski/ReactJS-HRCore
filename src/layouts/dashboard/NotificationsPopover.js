// import faker from "faker";
import { noCase } from "change-case";
import { useRef, useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import bellFill from "@iconify/icons-eva/bell-fill";
import clockFill from "@iconify/icons-eva/clock-fill";
import doneAllFill from "@iconify/icons-eva/done-all-fill";
import { LikeIcon } from "../../components/Thanks/ThanksCardElements/LikeIcon";

import { useAuth } from "../../utils/context/AuthContext";

// material
import { alpha } from "@mui/material/styles";
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  Skeleton,
  Grid,
} from "@mui/material";

import Scrollbar from "../../components/Scrollbar";
import MenuPopover from "../../components/MenuPopover";
import moment from "moment";
import { notificationsContext } from "../../utils/context/contexts";
import { ref, getDatabase, update } from "firebase/database";
// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.Title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &nbsp; {noCase(notification.Description)}
      </Typography>
    </Typography>
  );

  if (notification.Type === "order_placed") {
    return {
      avatar: (
        <img
          alt={notification.Title}
          src="/images/icons/ic_notification_package.svg"
        />
      ),
      title,
    };
  }
  if (notification.Type === "order_shipped") {
    return {
      avatar: (
        <img
          alt={notification.Title}
          src="/images/icons/ic_notification_shipping.svg"
        />
      ),
      title,
    };
  }
  if (notification.Type === "mail") {
    return {
      avatar: (
        <img
          alt={notification.Title}
          src="/images/icons/ic_notification_mail.svg"
        />
      ),
      title,
    };
  }
  if (notification.Type === "chat_message") {
    return {
      avatar: (
        <LikeIcon sx={{ color: "red", window: 15, height: 15 }} status="true" />
      ),
      title,
    };
  }
  if (notification.Type === "liked") {
    return {
      avatar: (
        <LikeIcon sx={{ color: "red", window: 15, height: 15 }} status="true" />
      ),
      title,
    };
  }
  if (notification.Type === "comment") {
    return {
      avatar: (
        <img
          alt={notification.Title}
          src="/images/icons/ic_notification_chat.svg"
        />
      ),
      title,
    };
  }
  if (notification.Type === "thanks") {
    return {
      avatar: (
        <img alt={notification.Title} src="/images/icons/thumbs-up.svg" />
      ),
      title,
    };
  }
  if (notification.Type === "task") {
    return {
      avatar: (
        <img alt={notification.Title} src="/images/icons/clipboard.svg" />
      ),
      title,
    };
  }
  return {
    // avatar: (
    //   <LikeIcon sx={{ color: "red", window: 15, height: 15 }} status="true" />
    // ),
    title,
  };
}

function NotificationItem({ notification, click, handleClose }) {
  const { avatar, title } = renderContent(notification);
  const { userData } = useAuth();

  return (
    userData && (
      <ListItemButton
        onClick={() => {
          click(notification.ID, userData.id);
          handleClose();
        }}
        to="/thanks"
        disableGutters
        component={RouterLink}
        sx={{
          py: 1.5,
          px: 2.5,
          mt: "1px",
          ...(notification.isUnRead && {
            bgcolor: "action.selected",
          }),
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                color: "text.disabled",
              }}
            >
              <Box
                component={Icon}
                icon={clockFill}
                sx={{ mr: 0.5, width: 16, height: 16 }}
              />
              {moment(notification.Timestamp).from(new Date())}
              {/* {moment.unix(notification.Timestamp).from(new Date())} */}
            </Typography>
          }
        />
      </ListItemButton>
    )
  );
}

export default function NotificationsPopover() {
  const { userData } = useAuth();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { notifications } = useContext(notificationsContext);
  const dbrt = getDatabase();

  const unRead = notifications.filter((item) => item.isUnRead === true);
  const Read = notifications.filter((item) => item.isUnRead === false);
  const totalUnRead = unRead.length;
  const noun = totalUnRead.length >= 2 ? "notifications" : "notification";
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    unRead.forEach((not) => {
      handleMarkRead(not.ID, userData.id);
    });
  };

  const handleMarkRead = (notificationId, userId) => {
    update(ref(dbrt, `Notifications/${userId}/${notificationId}`), {
      isUnRead: false,
    });
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have {totalUnRead} unread {noun}
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Divider />
        <Scrollbar sx={{ height: { xs: 340, sm: 400, lg: 400 } }}>
          {/* { xs: 340, sm: 340, lg: 340 } */}
          {totalUnRead > 0 && (
            <List
              disablePadding
              subheader={
                <ListSubheader
                  disableSticky
                  sx={{ py: 1, px: 2.5, typography: "overline" }}
                >
                  New
                </ListSubheader>
              }
            >
              {unRead.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  click={handleMarkRead}
                  close={handleClose}
                />
              ))}
            </List>
          )}
          {Read.length > 0 && (
            <List
              disablePadding
              subheader={
                <ListSubheader
                  disableSticky
                  sx={{ py: 1, px: 2.5, typography: "overline" }}
                >
                  Read
                </ListSubheader>
              }
            >
              {Read.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </List>
          )}
          {(Read.length === 0) & (unRead.length === 0) ? (
            <Typography
              variant="body1"
              textAlign="center"
              sx={{ paddingTop: 2 }}
            >
              No notifications...
            </Typography>
          ) : null}
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple component={RouterLink} to="#">
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
