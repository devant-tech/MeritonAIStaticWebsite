import {
    Navigate,
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom';

import {
    fullPublicRoutes,
    halfPublicRoutes,
    privateRoutes,
    ROUTE_PATH
} from './routes/routes';
import { PrivateLayout } from '@components/Layouts/PrivateLayout';
import { HalfPublicLayout } from './components/Layouts/HalfPublicLayout';
import { FullPublicLayout } from './components/Layouts/FullPublicLayout';

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
