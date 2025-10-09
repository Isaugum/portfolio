// @ts-check
import 'dotenv/config';
import { defineConfig } from 'astro/config';
export default defineConfig({
    server: {
        port: parseInt(process.env.PORT ?? '3000')
    }
});