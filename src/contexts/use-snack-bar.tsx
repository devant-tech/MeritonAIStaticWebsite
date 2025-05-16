import { createContext, useContext, useState } from 'react';
import { Alert, Snackbar, AlertColor } from '@mui/material';

const SnackBarContext = createContext<unknown>(null);

export const SnackBarProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [severity, setSeverity] = useState('success'); // 'success' or 'error'
    const [message, setMessage] = useState('');

    return (
        <SnackBarContext.Provider
            value={{
                setOpenSnackbar,
                setSeverity,
                setMessage
            }}
        >
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                open={openSnackbar}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={severity as AlertColor}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {message}
                </Alert>
            </Snackbar>
            {children}
        </SnackBarContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSnackBar = () => {
    return useContext(SnackBarContext);
};
