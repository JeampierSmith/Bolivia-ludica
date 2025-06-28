import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  base: '/Bolivia-ludica/', 
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',     
      '/Bolivia-ludica/api': 'http://localhost:3000',
      '/uploads': 'http://localhost:3000',  
    },
    setupMiddlewares(middlewares, devServer) {
      middlewares.use('/uploads', (req, res, next) => {
        const filePath = path.join(__dirname, '../backend/uploads', req.url);
        if (fs.existsSync(filePath)) {
          fs.createReadStream(filePath).pipe(res);
        } else {
          next();
        }
      });
      return middlewares;
    }
  }
});
