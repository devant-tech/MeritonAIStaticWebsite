import { Navigate } from 'react-router-dom';
import ExampleApp from '../components/Example/ExampleApp';
import { lazy } from 'react';
import Home from '../pages/Home';
import Settings from '@pages/Settings';
import Users from '@pages/Users';

const SignIn = lazy(() => import('../pages/Authentication/SignIn/SignIn'));
// const ResetPasswordRequest = lazy(
//     () =>
//         import(
//             '../pages/Authentication/ResetPasswordRequest/ResetPasswordRequest'
//         )
// );
// const ResetPassword = lazy(
//     () => import('../pages/Authentication/ResetPassword/ResetPassword')
// );
// const AccountActivation = lazy(
//     () => import('../pages/Authentication/Activation/Activation')
// );

export const ROUTE_PATH = {
    HOME: '/home',
    USER: '/users',
    ACCOUNT: '/account',
    SETTINGS: '/settings',
    LOGIN: '/account/login',
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
        path: ROUTE_PATH.ACCOUNT,
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
        path: '/',
        element: <ExampleApp />
    }
];

export const routes = [
    ...fullPublicRoutes,
    ...halfPublicRoutes,
    ...privateRoutes
];
