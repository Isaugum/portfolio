// @ts-check
import { defineConfig } from 'astro/config';
import 'dotenv/config';
import path from 'path';

import react from '@astrojs/react';

export default defineConfig({
  server: {
    port: parseInt(process.env.PORT ?? '3000'),
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@utils': path.resolve('./src/utils'),
        '@styles': path.resolve('./src/scss'),
        '@layout': path.resolve('./src/scss/layout'),
        '@core': path.resolve('./src/scss/core'),
        '@style_components': path.resolve('./src/scss/components'),
        '@data': path.resolve('./src/data'),
        '@database': path.resolve('./src/database'),
        '@public': path.resolve('./public'),
      },
    },
  },
  integrations: [react()],
});
