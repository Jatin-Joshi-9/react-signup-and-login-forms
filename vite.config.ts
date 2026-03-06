import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  test: {
    globals: true,       
    environment: 'jsdom', 
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],   // text = terminal output, html = browser report
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/tests/**', 'src/main.tsx', 'src/types/**'],
    }
  },
})