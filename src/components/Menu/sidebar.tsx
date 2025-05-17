import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export interface MenuItem {
    id: string;
    title: string;
    type: 'item' | 'group' | 'collapse';
    url?: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
    target?: boolean;
    breadcrumbs?: boolean;
}

export const MenuSidebar: MenuItem[] = [
    {
        id: 'home',
        title: 'Home',
        type: 'item',
        url: '/home',
        icon: <HomeOutlinedIcon />
    },
    {
        id: 'users',
        title: 'Users',
        type: 'item',
        url: '/users',
        icon: <HomeOutlinedIcon />
    },
    {
        id: 'my-students',
        title: 'My Students',
        type: 'collapse',
        icon: <PersonOutlineOutlinedIcon />,
        children: [
            {
                id: 'my-students-application-overview',
                title: 'Application Overview',
                type: 'item',
                url: '/student-applications',
                icon: <PersonOutlineOutlinedIcon />,
                target: false,
                breadcrumbs: false
            }
        ]
    }
];
