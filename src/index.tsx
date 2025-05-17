import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';

import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/styles/main.css';
import { SnackBarProvider } from './contexts/use-snack-bar';
import { queryClient } from './api/client';
import { CustomThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './contexts/use-auth';
import i18next from './i18n';

const root = createRoot(document.getElementById('root') as HTMLElement);
const storedLanguage = localStorage.getItem('locale') || 'en';
i18next.changeLanguage(storedLanguage);

root.render(
    <StrictMode>
        <CustomThemeProvider>
            <I18nextProvider i18n={i18next}>
                <SnackBarProvider>
                    <QueryClientProvider client={queryClient}>
                        <AuthProvider>
                            <App />
                        </AuthProvider>
                    </QueryClientProvider>
                </SnackBarProvider>
            </I18nextProvider>
        </CustomThemeProvider>
    </StrictMode>
);
