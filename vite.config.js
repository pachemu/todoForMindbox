import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'react-router/dom': path.resolve(__dirname, './node_modules/react-router-dom/dist'),
        }
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true
        },
        outDir: path.resolve(__dirname, './dist'),
    }
});
