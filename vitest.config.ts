/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./__tests__/**/*.test.ts'],
    globalSetup: './__tests__/test-globals.ts',
  },
});