import { Navigate } from 'react-router-dom';
// lazy import following components
import { lazy } from 'react';
const ExampleApp = lazy(() => import('@components/Example/ExampleApp'));
const Home = lazy(() => import('@pages/Home'));
const Settings = lazy(() => import('@pages/Settings'));
const Users = lazy(() => import('@pages/Users'));
const About = lazy(() => import('@pages/About'));
const Tasks = lazy(() => import('@pages/Tasks'));
const Profile = lazy(() => import('@pages/Profile'));
const Account = lazy(() => import('@pages/Account'));
const SignIn = lazy(() => import('@pages/Authentication/SignIn/SignIn'));

export const ROUTE_PATH = {
    ABOUT: '/about',
    AUTH: '/auth',
    ACCOUNT: '/account',
    HOME: '/home',
    PROFILE: '/profile',
    SETTINGS: '/settings',
    TASK: '/tasks',
    USER: '/users',
    LOGIN: '/auth/login',
    FORGOT_PASSWORD: 'forgot-password',
    RESET_PASSWORD: 'reset-password',
    VERIFY_EMAIL: 'verify-email'
};

export const fullPublicRoutes = [
    {
        path: '/',
        element: <Navigate to={ROUTE_PATH.HOME} />
    }
];

export const halfPublicRoutes = [
    {
        path: ROUTE_PATH.AUTH,
        children: [
            {
                path: ROUTE_PATH.LOGIN,
                Component: SignIn
            }
            // {
            //     path: ROUTE_PATH.FORGOT_PASSWORD,
            //     Component: ResetPasswordRequest
            // },
            // {
            //     path: ROUTE_PATH.RESET_PASSWORD,
            //     Component: ResetPassword
            // },
            // {
            //     path: ROUTE_PATH.VERIFY_EMAIL,
            //     Component: AccountActivation
            // }
        ]
    },
    {
        path: '/',
        element: <Navigate to={ROUTE_PATH.HOME} />
    }
];

export const privateRoutes = [
    {
        path: ROUTE_PATH.HOME,
        children: [
            {
                path: '',
                exact: true,
                Component: Home
            },

            {
                path: 'members',
                exact: true,
                Component: ExampleApp
            }
        ]
    },
    {
        path: ROUTE_PATH.SETTINGS,
        exact: true,
        Component: Settings
    },
    {
        path: ROUTE_PATH.USER,
        exact: true,
        Component: Users
    },
    {
        path: ROUTE_PATH.TASK,
        exact: true,
        Component: Tasks
    },
    {
        path: ROUTE_PATH.ABOUT,
        exact: true,
        Component: About
    },
    {
        path: ROUTE_PATH.PROFILE,
        exact: true,
        Component: Profile
    },
    {
        path: ROUTE_PATH.ACCOUNT,
        exact: true,
        Component: Account
    },
    {
        path: '/',
        element: <ExampleApp />
    }
];

export const routes = [
    ...fullPublicRoutes,
    ...halfPublicRoutes,
    ...privateRoutes
];
