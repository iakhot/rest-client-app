import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./__tests__/setupTests.tsx'],
    mockReset: true,
    coverage: {
      include: ['**/*.{ts,tsx}'],
      exclude: [
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        'index.{ts,tsx}',
        'setupTests.{ts,tsx}',
        '**/*.d.ts',
        '**/index.{ts,tsx}',
        '__tests__',
      ],
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
    alias: {
      '@/*': path.resolve(__dirname, './*'),
    },
    deps: {
      moduleDirectories: ['node_modules', '__tests__'],
    },
    server: {
      deps: {
        inline: ['next-intl'],
      },
    },
  },
});
