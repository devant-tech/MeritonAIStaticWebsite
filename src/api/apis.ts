import { request } from './request';

export const forgotPassword = ({ email }: { email: string }) =>
    request.post('/auth/forgot-password', { email });

export const resetPassword = ({
    email,
    password,
    token
}: {
    email: string;
    password: string;
    token: string;
}) => request.post('/auth/reset-password', { email, password, token });
