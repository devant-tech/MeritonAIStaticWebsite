import { Navigate, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Loading from '../Loading/Loading';
import { useAuth } from '@contexts/use-auth';
import { ROUTE_PATH } from '@routes/routes';

export const HalfPublicLayout = () => {
    const { isAuthenticated } = useAuth();
    const query = new URLSearchParams(window.location.search);

    if (isAuthenticated) {
        if (query.get('p')) {
            return <Navigate to={query.get('p') as string} />;
        }
        return <Navigate to={ROUTE_PATH.HOME} />;
    }
    return (
        <Suspense fallback={<Loading />}>
            <Outlet />
        </Suspense>
    );
};
