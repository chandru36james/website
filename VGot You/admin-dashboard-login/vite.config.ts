import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    base: './', // <-- ensures assets are loaded relative to /admin
    build: {
      outDir: '../public_html/admin', // <-- output directly into your admin folder
      emptyOutDir: true,             // <-- clears old build before building
      assetsDir: 'assets',           // optional: store JS/CSS/images inside /assets
    }
  };
});
