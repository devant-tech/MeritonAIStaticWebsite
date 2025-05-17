import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';

import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/styles/main.css';
import { SnackBarProvider } from './contexts/use-snack-bar';
import { queryClient } from './api/client';
import AppTheme from './components/ThemeProvider';
import { AuthProvider } from './contexts/use-auth';
import i18next from './i18n';
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations
} from './theme/customizations';

const root = createRoot(document.getElementById('root') as HTMLElement);
const storedLanguage = localStorage.getItem('locale') || 'en';
i18next.changeLanguage(storedLanguage);

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations
};

root.render(
    <StrictMode>
        <AppTheme themeComponents={xThemeComponents}>
            <I18nextProvider i18n={i18next}>
                <SnackBarProvider>
                    <QueryClientProvider client={queryClient}>
                        <AuthProvider>
                            <App />
                        </AuthProvider>
                    </QueryClientProvider>
                </SnackBarProvider>
            </I18nextProvider>
        </AppTheme>
    </StrictMode>
);
