import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite'

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.js'),
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
