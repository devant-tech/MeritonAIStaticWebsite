import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@contexts/use-auth';
import { ROUTE_PATH } from '@routes/routes';

import Menu from '../Menu';

export const PrivateLayout = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        if (window.location.pathname.split('?')[0] === ROUTE_PATH.LOGIN) {
            return <Navigate to={`${ROUTE_PATH.LOGIN}`} />;
        } else {
            return (
                <Navigate
                    to={`${ROUTE_PATH.LOGIN}?p=${window.location.pathname.split('?')[0]}`}
                />
            );
        }
    }
    return (
        <Menu>
            <Outlet />
        </Menu>
    );
};
