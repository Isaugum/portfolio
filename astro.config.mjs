// @ts-check
import 'dotenv/config';
import { defineConfig } from 'astro/config';
import path from 'path';

import react from '@astrojs/react';

export default defineConfig({
    server: {
        port: parseInt(process.env.PORT ?? '3000')
    },
    vite: {
        resolve: {
            alias: { 
              '@styles': path.resolve('./src/scss'),
              '@utils': path.resolve('./src/utils'),
              '@components': path.resolve('./src/components')
            },
        }
    },
    integrations: [react()],
});