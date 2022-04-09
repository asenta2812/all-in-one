/* eslint-disable prettier/prettier */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@page': path.resolve(__dirname, './src/page'),
      '@client': path.resolve(__dirname, './src/client'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@containers': path.resolve(__dirname, './src/containers'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@ultils': path.resolve(__dirname, './src/ultils'),
      '@contexts': path.resolve(__dirname, './src/contexts/'),
    },
  },
})
