import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { useState } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';

const drawerWidth = 300;
const appBarHeight = 64; // Standard Material-UI AppBar height

export default function Menu({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Menu</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant={ismobile ? "temporary" : "persistent"}
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
                    },
                }}
            >
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
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
                    marginLeft: ismobile === true? 0 : `-${drawerWidth}px`,
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
                <Box sx={{ 
                    height: `calc(100vh - ${appBarHeight}px)`,
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
