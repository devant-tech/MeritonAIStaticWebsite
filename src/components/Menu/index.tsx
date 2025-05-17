import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Collapse,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MailIcon from '@mui/icons-material/Mail';
import { Link as LinkDom, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { MenuSidebar } from './sidebar';
import { t } from 'i18next';
import { stringAvatar } from '@utils/helper';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { ROUTE_PATH } from '@routes/routes';
import { logout } from '@api/apis';
const drawerWidth = 200;
const appBarHeight = 64; // Standard Material-UI AppBar height

const RenderMenu = ({
    anchorEl,
    handleClose,
    isMenuOpen,
    handleCloseProfile,
    handleCloseSettings,
    handleCloseLogout
}: any) => (
    <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        id="account-menu"
        onClick={handleClose}
        onClose={handleClose}
        open={isMenuOpen}
        sx={{
            // overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
            },
            '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
            }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
        <MenuItem onClick={handleCloseProfile}>
            <Avatar />
            {`Test User`}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseSettings}>
            <ListItemIcon>
                <SettingsIcon fontSize="small" />
            </ListItemIcon>
            {t('Settings', { ns: 'common' })}
        </MenuItem>
        <MenuItem onClick={handleCloseLogout}>
            <ListItemIcon>
                <LogoutIcon fontSize="small" />
            </ListItemIcon>
            {t('Log Out', { ns: 'common' })}
        </MenuItem>
    </Menu>
);

export default function AppMenu({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const location = useLocation();
    const ismobile = useMediaQuery(theme.breakpoints.down('md'));
    const initialMenuItemOpen: any =
        MenuSidebar?.reduce((acc: any, menuItem) => {
            acc[menuItem.id] = menuItem.children?.some(
                (subItem: any) => subItem.url === location.pathname
            );
            return acc;
        }, {}) || {};
    const navigate = useNavigate();

    const [menuItemOpen, setMenuItemOpen] = useState(initialMenuItemOpen);
    const menuId = 'primary-search-account-menu';
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseProfile = () => {
        setAnchorEl(null);
        // setMobileMoreAnchorEl(null);
        navigate(ROUTE_PATH.SETTINGS);
    };

    const handleCloseSettings = () => {
        setAnchorEl(null);
        // setMobileMoreAnchorEl(null);
        navigate(ROUTE_PATH.SETTINGS);
    };
    const handleCloseLogout = () => {
        setAnchorEl(null);
        // setMobileMoreAnchorEl(null);
        logout();
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen
                    }), // width: `calc(100% - ${0}px)`,
                    marginLeft: ismobile === true ? 0 : `-${drawerWidth}px`,
                    ...(open && {
                        width:
                            ismobile === true
                                ? '100%'
                                : `calc(100% - ${drawerWidth}px)`,
                        // marginLeft: ismobile ? `${drawerWidth}px` : 0,
                        transition: theme.transitions.create(
                            ['margin', 'width'],
                            {
                                easing: theme.transitions.easing.easeOut,
                                duration:
                                    theme.transitions.duration.enteringScreen
                            }
                        )
                    })
                }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setOpen(!open)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Menu</Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            aria-controls={'123'}
                            aria-haspopup="true"
                            aria-label="show unread new messages"
                            color="inherit"
                            // onClick={handleOpenChat}
                            size="large"
                        >
                            <Badge badgeContent={2} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <Tooltip
                            placement="bottom-start"
                            title="Account settings"
                        >
                            <IconButton
                                aria-controls={menuId}
                                aria-haspopup="true"
                                aria-label="account of current user"
                                color="inherit"
                                edge="end"
                                onClick={handleProfileMenuOpen}
                                size="large"
                            >
                                <Avatar
                                    {...stringAvatar(`Test User`)}
                                    size="small"
                                    title={`Test User`}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant={ismobile ? 'temporary' : 'persistent'}
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        height: '100%',
                        top: appBarHeight
                    }
                }}
            >
                <List disablePadding>
                    {MenuSidebar.map((menuItem) =>
                        menuItem.children ? (
                            <Box key={menuItem.id}>
                                <ListItemButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setMenuItemOpen((prevState: any) => ({
                                            ...prevState,
                                            [menuItem.id]:
                                                prevState[menuItem.id] ===
                                                undefined
                                                    ? true
                                                    : !prevState[menuItem.id]
                                        }));
                                    }}
                                >
                                    <ListItemText primary={menuItem.title} />
                                    {menuItemOpen[menuItem.id] ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </ListItemButton>
                                <Collapse
                                    in={menuItemOpen[menuItem.id]}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <List disablePadding>
                                        {menuItem.children.map(
                                            (subMenuItem) => (
                                                <ListItemButton
                                                    component={LinkDom}
                                                    key={subMenuItem.id}
                                                    selected={
                                                        subMenuItem.url ===
                                                        location.pathname
                                                    }
                                                    sx={{ pl: 4 }}
                                                    to={subMenuItem.url || ''}
                                                >
                                                    <ListItemIcon
                                                        sx={{ mr: -3 }}
                                                    >
                                                        {subMenuItem.icon}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            subMenuItem.title
                                                        }
                                                    />
                                                </ListItemButton>
                                            )
                                        )}
                                    </List>
                                </Collapse>
                            </Box>
                        ) : (
                            <ListItemButton
                                component={LinkDom}
                                key={menuItem.id}
                                selected={menuItem.url === location.pathname}
                                to={menuItem.url || ''}
                            >
                                <ListItemIcon sx={{ mr: -3 }}>
                                    {menuItem.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={t(menuItem.title, {
                                        ns: 'common'
                                    })}
                                />
                            </ListItemButton>
                        )
                    )}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen
                    }),
                    marginLeft: ismobile === true ? 0 : `-${drawerWidth}px`,
                    ...(open && {
                        transition: theme.transitions.create('margin', {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen
                        }),
                        marginLeft: 0
                    })
                }}
            >
                <Toolbar /> {/* Spacer for AppBar */}
                <Box
                    sx={{
                        height: `calc(100vh - ${appBarHeight}px)`,
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {children}
                    <RenderMenu
                        anchorEl={anchorEl}
                        handleClose={handleClose}
                        handleCloseLogout={handleCloseLogout}
                        handleCloseProfile={handleCloseProfile}
                        handleCloseSettings={handleCloseSettings}
                        isMenuOpen={isMenuOpen}
                    />
                </Box>
            </Box>
        </Box>
    );
}
