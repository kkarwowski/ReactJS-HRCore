import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Grid, Badge } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// components
// import { MHidden } from '../../components/@material-extend';
//
// import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';

// import LanguagePopover from './LanguagePopover';
// import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 200;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 72;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  // backgroundColor: alpha(theme.palette.background.paper, 0.2),
  backgroundColor: "white",
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default function DashboardNavbar({ onOpenSidebar }) {
  return (
    <RootStyle>
      <ToolbarStyle>
        {/* <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden> */}

        {/* <Searchbar />
        <Box sx={{ flexGrow: 1 }} />*/}
        <Grid container
        direction="row"
        justifyContent="flex-end">
          {/* // <LanguagePopover />
          // <NotificationsPopover />  */}
          <IconButton aria-label="cart" sx={{pr:5}}>
          <StyledBadge badgeContent={4} color="secondary">
            <NotificationsNoneIcon/>
          </StyledBadge>
        </IconButton>
          <AccountPopover />
        </Grid>
      </ToolbarStyle>
    </RootStyle>
  );
}
