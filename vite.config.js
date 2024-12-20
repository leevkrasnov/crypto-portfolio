import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    chunkSizeWarningLimit: 2000,
  },
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@context': '/src/context',
      '@data': '/src/data',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
    },
  },
});
