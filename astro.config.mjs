import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://aitorarcas.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});