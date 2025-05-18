import { getData, request } from './request';

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

// export const login = (credentials: any) =>
//     request.post('/auth/login', credentials);
export const login = (credentials: any) =>
    Promise.resolve({
        status: 200,
        data: { success: true, data: credentials }
    });

export const logout = () => request.get('/auth/logout');

export const register = (credentials: any) =>
    request.post('/auth/signup', credentials);

export const activation = (email: string, token: string) =>
    request.post('/auth/activation', { email, token });

// TODO: make resendActivation works
export const resendActivation = ({ email }: { email: string }) =>
    request.post('/auth/resend-activation', { email });

// mock verify:
// export const verify = () => request.get('/auth/verify');
export const verify = () =>
    Promise.resolve({
        status: 200,
        data: { success: true, data: 'success' }
    });

export const verifyV2 = () => getData('/auth/verify');
