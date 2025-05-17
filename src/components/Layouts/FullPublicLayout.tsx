import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Loading from '../Loading/Loading';

export const FullPublicLayout = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Outlet />
        </Suspense>
    );
};
