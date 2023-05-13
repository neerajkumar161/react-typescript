import { Plugin } from 'esbuild-wasm'

export const unpkgPathPlugin = (): Plugin => {
  return {
    name: 'unpkg-path-plugin',
    setup({ onResolve }) {
      /* for index.js */
      onResolve({ filter: /(^index\.js$)/ }, (args) => ({ path: args.path, namespace: 'a' }))

      /* for relatives paths in module, args.path.includes './' and '../' */
      onResolve({ filter: /^\.+\// }, (args) => ({
        path: new URL(args.path, `http://www.unpkg.com${args.resolveDir}/`).href,
        namespace: 'a'
      }))
      /* for main file of module */
      onResolve({ filter: /.*/ }, async (args) => ({
        path: `https://www.unpkg.com/${args.path}`,
        namespace: 'a'
      }))
    }
  }
}
