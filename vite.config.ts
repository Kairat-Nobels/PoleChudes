import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': path.resolve('src/api'),
      '@redux': path.resolve('src/redux'),
      '@components': path.resolve('src/components'),
      '@pages': path.resolve('src/pages'),
      '@routes': path.resolve('src/routes'),
      '@ui': path.resolve('src/ui'),
      '@images': path.resolve('src/assets'),
      '@hooks': path.resolve('src/hooks'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
});
