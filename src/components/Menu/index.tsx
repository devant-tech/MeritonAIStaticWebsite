import {
    AppBar,
    Avatar,
    Box,
    CssBaseline,
    Drawer as MuiDrawer,
    drawerClasses,
    Stack,
    Toolbar,
    Typography
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useState } from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Divider from '@mui/material/Divider';

import SelectContent from '@components/SelectContent';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import ColorModeIconDropdown from './ColorModeIconDropdown';
import MenuButton from './MenuButton';
import SideMenuMobile from './SideMenuMobile';
import Header from './Header';
const appBarHeight = 64; // Standard Material-UI AppBar height

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box'
    }
});

export default function AppMenu({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
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
                        mt: 'calc(var(--template-frame-height, 0px) + 2px)',
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
            <AppBar
                position="fixed"
                sx={{
                    display: { xs: 'auto', md: 'none' },
                    boxShadow: 0,
                    bgcolor: 'background.paper',
                    backgroundImage: 'none',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    top: 'var(--template-frame-height, 0px)'
                }}
            >
                <Toolbar variant="regular">
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: 'center',
                            flexGrow: 1,
                            width: '100%',
                            gap: 1
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ justifyContent: 'center', mr: 'auto' }}
                        >
                            <CustomIcon />
                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{ color: 'text.primary' }}
                            >
                                Dashboard
                            </Typography>
                        </Stack>
                        <ColorModeIconDropdown />
                        <MenuButton
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuRoundedIcon />
                        </MenuButton>
                        <SideMenuMobile
                            open={open}
                            toggleDrawer={toggleDrawer}
                        />
                    </Stack>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={(theme) => ({
                    flexGrow: 1,
                    backgroundColor: theme.vars
                        ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                        : alpha(theme.palette.background.default, 1),
                    overflow: 'auto'
                })}
            >
                <Stack
                    spacing={2}
                    sx={{
                        height: `calc(100vh - ${appBarHeight}px)`,
                        alignItems: 'center'
                    }}
                >
                    <Header />
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: { sm: '100%', md: '1700px' }
                        }}
                    >
                        {children}
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}

export function CustomIcon() {
    return (
        <Box
            sx={{
                width: '1.5rem',
                height: '1.5rem',
                bgcolor: 'black',
                borderRadius: '999px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundImage:
                    'linear-gradient(135deg, hsl(210, 98%, 60%) 0%, hsl(210, 100%, 35%) 100%)',
                color: 'hsla(210, 100%, 95%, 0.9)',
                border: '1px solid',
                borderColor: 'hsl(210, 100%, 55%)',
                boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.3)'
            }}
        >
            <DashboardRoundedIcon color="inherit" sx={{ fontSize: '1rem' }} />
        </Box>
    );
}
