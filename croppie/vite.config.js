import { defineConfig } from 'vite';
import { resolve } from 'path';

console.log("env: " + process.env.NODE_ENV);

const CDN_URL = process.env.NODE_ENV === 'production' ? './' : '/';
const CDN_MEDIA_URL = process.env.NODE_ENV === 'production' ? './assets/' : './src/assets/';

export default defineConfig({
    root: './src',

    base: CDN_URL,

    resolve: {
        alias: {
            src: resolve(__dirname, '/src'),
            assets: resolve(__dirname, '/src/assets'),
            less: resolve(__dirname, '/src/less')
        }
    },

    build: {
        outDir: '../dist',
        emptyOutDir: true
    },
    server: {
        host: 'localhost',
        port: 9531,
        open: true
    }
});