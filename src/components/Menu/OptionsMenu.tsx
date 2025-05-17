import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider, { dividerClasses } from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { paperClasses } from '@mui/material/Paper';
import { listClasses } from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MenuButton from './MenuButton';
import { ROUTE_PATH } from '@routes/routes';
import { useNavigate } from 'react-router-dom';

const MenuItem = styled(MuiMenuItem)({
    margin: '2px 0'
});

export default function OptionsMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleNavigateClose = (path: string) => {
        navigate(path);
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <MenuButton
                aria-label="Open menu"
                onClick={handleClick}
                sx={{ borderColor: 'transparent' }}
            >
                <MoreVertRoundedIcon />
            </MenuButton>
            <Menu
                anchorEl={anchorEl}
                id="menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                sx={{
                    [`& .${listClasses.root}`]: {
                        padding: '4px'
                    },
                    [`& .${paperClasses.root}`]: {
                        padding: 0
                    },
                    [`& .${dividerClasses.root}`]: {
                        margin: '4px -4px'
                    }
                }}
            >
                <MenuItem
                    onClick={() => handleNavigateClose(ROUTE_PATH.PROFILE)}
                >
                    Profile
                </MenuItem>
                <MenuItem
                    onClick={() => handleNavigateClose(ROUTE_PATH.ACCOUNT)}
                >
                    My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleNavigateClose(ROUTE_PATH.TASK)}>
                    Add another account
                </MenuItem>
                <MenuItem
                    onClick={() => handleNavigateClose(ROUTE_PATH.SETTINGS)}
                >
                    Settings
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => handleNavigateClose('/')}
                    sx={{
                        [`& .${listItemIconClasses.root}`]: {
                            ml: 'auto',
                            minWidth: 0
                        }
                    }}
                >
                    <ListItemText>Logout</ListItemText>
                    <ListItemIcon>
                        <LogoutRoundedIcon fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
