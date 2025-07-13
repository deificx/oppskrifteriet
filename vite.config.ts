import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { URL, fileURLToPath } from 'url';
import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => ({
  base: 'https://oppskrifteriet.no/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [
    vue(),
    {
      name: 'publish',
      async buildEnd() {
        if (mode !== 'build' && mode !== 'production') {
          return;
        }
        const ghpages = await import('gh-pages');
        ghpages.publish('dist', function (err) {
          if (err) {
            console.error('failed: ', err);
            return;
          }
          console.log('published dist');
        });
      },
    },
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
}));
