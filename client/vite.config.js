import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': { //changed from /api to /graphql because we are using graphql's queries instead of api folder's routes
        target: 'http://localhost:3001/graphql', //creates an endpoint "/graphql" that pulls up the apollo server page
        secure: false,
        changeOrigin: true
      }
    }
  }
})
