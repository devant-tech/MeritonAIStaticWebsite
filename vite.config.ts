import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path, { resolve } from 'path';

const root = resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(root),
            '@api': path.resolve(root, 'api'),
            '@components': path.resolve(root, 'components'),
            '@contexts': path.resolve(root, 'contexts'),
            '@pages': path.resolve(root, 'pages'),
            '@routes': path.resolve(root, 'routes'),
            '@utils': path.resolve(root, 'utils')
        }
    },
    test: {
        // 👋 add the line below to add jsdom to vite
        environment: 'jsdom', // hey! 👋 over here
        globals: true,
        setupFiles: './tests/setup.js' // assuming the test folder is in the root of our project
    }
} as UserConfig);
