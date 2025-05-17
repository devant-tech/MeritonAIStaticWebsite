import {
    Navigate,
    Outlet,
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom';

import {
    fullPublicRoutes,
    halfPublicRoutes,
    privateRoutes,
    ROUTE_PATH
} from './routes/routes';
import Menu from './components/Menu';

const FullPublicLayout = () => {
    return (
        <Menu>
            <Outlet />
        </Menu>
    );
};
const HalfPublicLayout = () => {
    return (
        <Menu>
            <Outlet />
        </Menu>
    );
};
const PrivateLayout = () => {
    return (
        <Menu>
            <Outlet />
        </Menu>
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <FullPublicLayout />,
        children: [...fullPublicRoutes]
    }, // both login or no login user can access
    {
        path: '/',
        element: <HalfPublicLayout />,
        children: [...halfPublicRoutes]
    }, // only user without login can access
    { path: '/', element: <PrivateLayout />, children: [...privateRoutes] }, // only user with login can access
    { path: '*', element: <Navigate replace to={ROUTE_PATH.LOGIN} /> }
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
