import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/assets/styles'),
      '@public': path.resolve(__dirname, './src/public'),
      '@imgs': path.resolve(__dirname, './src/assets/imgs'),
      '@common': path.resolve(__dirname, './src/common'),
      '@components': path.resolve(__dirname, './src/common/components'),
    },
  },
});
