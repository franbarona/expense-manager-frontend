import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // Actualiza automáticamente el service worker
      manifest: {
        name: 'Monetix PWA',
        short_name: 'Monetix',
        description: 'Expense manager build with react by @FranBarona',
        theme_color: '#F5F5F5',
        background_color: '#F5F5F5',
        display: 'standalone',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Aquí puedes añadir reglas de cache específicas
        runtimeCaching: [
          {
            urlPattern: /.*\.js/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'js-cache',
            },
          },
        ],
      },
    }),
  ],
})
