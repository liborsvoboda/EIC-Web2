import { readdir, readFile } from 'node:fs/promises'
import { parse, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

import { build } from 'esbuild'

const [, , logLevel = 'info'] = process.argv
const pkg = JSON.parse(await readFile(new URL('package.json', import.meta.url)))

await build({
  entryPoints: ['src/index.ts', 'src/tailwindcss.worker.ts'],
  bundle: true,
  external: Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }).filter(
    (name) => name !== 'tailwindcss'
  ),
  logLevel,
  outdir: '.',
  sourcemap: true,
  format: 'esm',
  target: ['es2020'],
  loader: { '.css': 'text' },
  define: {
    'process.env.DEBUG': 'undefined',
    'process.env.JEST_WORKER_ID': '1',
    'process.env.NODE_ENV': '"production"',
    __OXIDE__: 'undefined',
    __dirname: '"/"'
  },
  plugins: [
    {
      name: 'alias',
      async setup({ onLoad, onResolve, resolve }) {
        const stubFiles = await readdir('src/stubs', { withFileTypes: true })
        // These packages are imported, but can be stubbed.
        const stubNames = stubFiles
          .filter((file) => file.isFile())
          .map((file) => parse(file.name).name)

        onResolve({ filter: new RegExp(`^(${stubNames.join('|')})$`) }, ({ path }) => ({
          path: fileURLToPath(new URL(`src/stubs/${path}.ts`, import.meta.url))
        }))

        // The tailwindcss main export exports CJS, but we can get better tree shaking if we import
        // from the ESM src directoy instead.
        onResolve({ filter: /^tailwindcss$/ }, ({ path, ...options }) =>
          resolve('tailwindcss/src', options)
        )

        onResolve({ filter: /^tailwindcss\/lib/ }, ({ path, ...options }) =>
          resolve(path.replace('lib', 'src'), options)
        )

        // This file pulls in a number of dependencies, but we don’t really need it anyway.
        onResolve({ filter: /^\.+\/(util\/)?log$/, namespace: 'file' }, ({ path, ...options }) => {
          if (options.importer.includes(`${sep}tailwindcss${sep}`)) {
            return {
              path: fileURLToPath(new URL('src/stubs/tailwindcss/utils/log.ts', import.meta.url))
            }
          }
          return resolve(path, {
            ...options,
            namespace: 'noRecurse'
          })
        })

        // CJS doesn’t require extensions, but ESM does. Since our package uses ESM, but dependant
        // bundled packages don’t, we need to add it ourselves.
        onResolve(
          { filter: /^(postcss-selector-parser|semver)\/.*\/\w+$/ },
          ({ path, ...options }) => resolve(`${path}.js`, options)
        )

        onResolve({ filter: /^postcss-value-parser$/ }, ({ path, ...options }) =>
          resolve('tailwindcss/src/value-parser', options)
        )

        onResolve({ filter: /^vscode-languageserver$/ }, ({ path, ...options }) =>
          resolve('vscode-languageserver-types', options)
        )

        // Rewrite the tailwind stubs from CJS to ESM, so our bundle doesn’t need to include any CJS
        // related logic.
        onLoad(
          { filter: /\/node_modules\/tailwindcss\/stubs\/defaultConfig\.stub\.js$/ },
          async ({ path }) => {
            const cjs = await readFile(path, 'utf8')
            const esm = cjs.replace('module.exports =', 'export default')
            return { contents: esm }
          }
        )

        // Rewrite the tailwind sharedState.env variables, so ESBuild can statically analyze and
        // remove dead code, including some problematic imports.
        onLoad({ filter: /\/node_modules\/tailwindcss\/.+\.js$/ }, async ({ path }) => {
          const source = await readFile(path, 'utf8')
          const contents = source
            .replaceAll(/(process\.)?env\.DEBUG/g, 'undefined')
            .replaceAll(/(process\.)?env\.ENGINE/g, '"stable"')
            .replaceAll(/(process\.)?env\.NODE_ENV/g, '"production"')
          return { contents }
        })
      }
    }
  ]
})
