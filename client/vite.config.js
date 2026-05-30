import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'LocalMart - Hyper-Local Vendor Discovery',
        short_name: 'LocalMart',
        description: 'Find what is in stock near you',
        theme_color: '#FF6B35',
        icons: []
      }
    })
  ],
})
