import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/styles/main.css';
import { SnackBarProvider } from './contexts/use-snack-bar';
import { queryClient } from './api/client';
import { CustomThemeProvider } from './components/ThemeProvider';
const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <CustomThemeProvider>
            <SnackBarProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </SnackBarProvider>
        </CustomThemeProvider>
    </StrictMode>
);
