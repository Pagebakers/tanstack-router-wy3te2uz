import { defineConfig } from '@tanstack/start/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import { codegenPlugin } from 'esbuild-codegen-plugin';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  vite: {
    plugins: [
      tsconfigPaths(),
      nodePolyfills({
        include: ['buffer', 'fs', 'constants', 'path'],
        globals: {
          Buffer: true,
          global: true,
        },
        overrides: {
          path: './path.js',
        },
        protocolImports: true,
      }),
    ],
    optimizeDeps: {
      include: ['piral-core', 'piral-base'],
      esbuildOptions: {
        plugins: [codegenPlugin()],
      },
    },
  },
});
