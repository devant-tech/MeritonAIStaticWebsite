import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { useLocation } from 'react-router-dom';
import { Link as LinkDom } from 'react-router-dom';

const mainListItems = [
    { text: 'Home', icon: <HomeRoundedIcon />, path: '/home' },
    { text: 'Users', icon: <PeopleRoundedIcon />, path: '/users' },
    { text: 'Tasks', icon: <AssignmentRoundedIcon />, path: '/tasks' },
    { text: 'Design', icon: <DesignServicesIcon />, path: '/design' }
];

const secondaryListItems = [
    { text: 'Settings', icon: <SettingsRoundedIcon />, path: '/settings' },
    { text: 'About', icon: <InfoRoundedIcon />, path: '/about' }
];

export default function MenuContent() {
    const location = useLocation();
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <ListItemButton
                            component={LinkDom}
                            selected={item.path === location.pathname}
                            to={item.path || ''}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <ListItemButton
                            component={LinkDom}
                            selected={item.path === location.pathname}
                            to={item.path || ''}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}
