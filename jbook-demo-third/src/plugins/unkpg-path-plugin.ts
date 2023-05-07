import axios from 'axios'
import * as esbuild from 'esbuild-wasm'

export const unpkgPathPlugin = (): esbuild.Plugin => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args) => {
        console.log('onResole', args)
        if (args.path === 'index.js') return { path: args.path, namespace: 'a' }

        if (args.path.includes('./') || args.path.includes('../')) {
          return { path: new URL(args.path, `http://www.unpkg.com${args.resolveDir}/`).href, namespace: 'a' }
        }

        // if (args.path === 'tiny-test-pkg') {
        return { path: `https://www.unpkg.com/${args.path}`, namespace: 'a' }
        // }
      })

      build.onLoad({ filter: /.*/ }, async (args) => {
        console.log('onLoad', args)
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const react = require('react');
              console.log(react);
            `
          }
        } else {
          const { data, request } = await axios.get(args.path)
          console.log({ data })
          return {
            loader: 'jsx',
            contents: data,
            resolveDir: new URL('./', request.responseURL).pathname
          }
        }
      })
    }
  }
}
