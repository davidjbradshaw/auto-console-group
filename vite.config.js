/* eslint-disable import/no-extraneous-dependencies */
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import copy from 'rollup-plugin-copy'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'

import createBanner from './build/create-banner'

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    banner(createBanner()),
    dts({
      insertTypesEntry: true,
    }),
    copy({
      hook: 'closeBundle',
      targets: [
        {
          src: 'dist/index.umd.cjs',
          dest: '.',
          rename: 'auto-console-group.js',
        },
      ],
      verbose: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'createConsoleGroup',
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
})
/* eslint-enable import/no-extraneous-dependencies */
