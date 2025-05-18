import { useEffect, createContext, useContext, useState } from 'react';
import { verify, logout } from '@api/apis';
import Loading from '@components/Loading/Loading';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userdata, setUserdata] = useState({
        error: '',
        success: false,
        data: null,
        isLoaded: false,
        res_modal_message: '',
        res_modal_status: 0
    });

    useEffect(() => {
        verify().then(
            (resp) => {
                const { data, success } = resp.data;
                if (success) {
                    setUserdata((state) => ({
                        ...state,
                        success: true,
                        data: data as unknown as null, // Type assertion to match state type
                        isLoaded: true
                    }));
                    setIsAuthenticated(true);
                } else {
                    setUserdata((state) => ({
                        ...state,
                        data: null,
                        isLoaded: true
                    }));
                }
            },
            (error) => {
                setUserdata((state) => ({
                    ...state,
                    isLoaded: true,
                    error,
                    res_modal_status: 500
                }));
            }
        );
    }, []);

    const login = (data: any) => {
        setUserdata((state) => ({
            ...state,
            data: data
        }));
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        console.log('logout');
        logout().then(
            () => {
                setUserdata((state) => ({
                    ...state,
                    data: null
                }));
                setIsAuthenticated(false);
            },
            (error) => {
                setUserdata((state) => ({
                    ...state,
                    isLoaded: true,
                    error
                }));
                setIsAuthenticated(false);
            }
        );

        setIsAuthenticated(false);
    };

    const authData = {
        user: userdata.data,
        isAuthenticated,
        isLoaded: userdata.isLoaded,
        login,
        logout: handleLogout
    };

    if (!userdata.isLoaded) {
        return <Loading />;
    }

    return (
        <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
