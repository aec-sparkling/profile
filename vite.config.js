import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: '/' works for <username>.github.io repos.
// If deploying to a project repo instead, set base: '/<repo-name>/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
});
