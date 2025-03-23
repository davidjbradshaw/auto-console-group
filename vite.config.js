/* eslint-disable import/no-extraneous-dependencies */
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pluginExternal from 'vite-plugin-external'

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    pluginExternal({
      externals: {
        'auto-group-console': 'createConsoleGroup',
      },
    }),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'auto-console-group',
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {},
      },
    },
  },
})
/* eslint-enable import/no-extraneous-dependencies */
