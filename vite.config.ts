import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  publicDir: 'apps/template-marketplace/public',
  resolve: {
    alias: {
      '@marketplace': path.resolve(__dirname, './apps/template-marketplace/src'),
      '@shared': path.resolve(__dirname, './shared'),
      '@templates': path.resolve(__dirname, './templates'),
      '@assets': path.resolve(__dirname, './assets'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, '/');
          if (normalized.includes('template-registry.json')) {
            return 'registry-catalog';
          }
          if (normalized.includes('node_modules')) {
            if (normalized.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (normalized.includes('react') || normalized.includes('scheduler')) {
              return 'vendor-react';
            }
            return 'vendor';
          }
          if (normalized.includes('/shared/')) {
            return 'shared-core';
          }
          const templateMatch = normalized.match(/\/templates\/([^/]+)\/([^/]+)\//);
          if (templateMatch) {
            const category = templateMatch[1];
            const slug = templateMatch[2];
            const numMatch = slug.match(/(\d+)$/);
            const num = numMatch ? parseInt(numMatch[1], 10) : 1;
            const group = num <= 18 ? 'g1' : 'g2';
            return `tpl-${category}-${group}`;
          }
        },
      },
    },
  },
});
