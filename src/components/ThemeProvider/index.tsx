import { createContext, useContext, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import themeLight from './themeLight';
import themeDark from './themeDark';

const CustomThemeContext = createContext<unknown>(null);

export const CustomThemeProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const isStoredDarkMode = localStorage.getItem('mode') === 'dark';
    const [isDarkMode, setIsDarkMode] = useState(isStoredDarkMode);

    const toggleDarkMode = () => {
        localStorage.setItem('mode', !isDarkMode ? 'dark' : 'light');
        setIsDarkMode(!isDarkMode);
    };

    const themeData = { isDarkMode, toggleDarkMode };

    return (
        <CustomThemeContext.Provider value={themeData}>
            <ThemeProvider theme={isDarkMode ? themeDark : themeLight}>
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCustomTheme = () => {
    return useContext(CustomThemeContext);
};
