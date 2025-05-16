import {
    Navigate,
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom';

import ExampleApp from './components/Example/ExampleApp';
import {
    fullPublicRoutes,
    halfPublicRoutes,
    privateRoutes,
    ROUTE_PATH
} from './routes/routes';

const FullPublicLayout = () => {
    return <ExampleApp />;
};
const HalfPublicLayout = () => {
    return <ExampleApp />;
};
const PrivateLayout = () => {
    return <ExampleApp />;
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
