import {
    AppBar,
    Avatar,
    Badge,
    Box,
    CssBaseline,
    Drawer,
    drawerClasses,
    IconButton,
    ListItemIcon,
    Menu,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { t } from 'i18next';
import { stringAvatar } from '@utils/helper';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { ROUTE_PATH } from '@routes/routes';
import { logout } from '@api/apis';
import SelectContent from '@components/SelectContent';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';

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
    const ismobile = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();

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
                    display: { xs: 'none', md: 'block' },
                    [`& .${drawerClasses.paper}`]: {
                        backgroundColor: 'background.paper'
                    }
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        mt: 'calc(var(--template-frame-height, 0px) + 4px)',
                        p: 1.5
                    }}
                >
                    <SelectContent />
                </Box>
                <Divider />
                <Box
                    sx={{
                        overflow: 'auto',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <MenuContent />
                </Box>
                <Stack
                    direction="row"
                    sx={{
                        p: 2,
                        gap: 1,
                        alignItems: 'center',
                        borderTop: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <Avatar
                        sizes="small"
                        alt="Test User"
                        src="/static/images/avatar/7.jpg"
                        sx={{ width: 36, height: 36 }}
                    />
                    <Box sx={{ mr: 'auto' }}>
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 500, lineHeight: '16px' }}
                        >
                            Test User
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary' }}
                        >
                            test@gmail.com
                        </Typography>
                    </Box>
                    <OptionsMenu />
                </Stack>
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
