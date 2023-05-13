import axios from 'axios'
import { OnLoadResult, Plugin } from 'esbuild-wasm'
import localForage from 'localforage'

const fileCache = localForage.createInstance({ name: 'filecache' })

export const fetchPlugin = (contents: string): Plugin => {
  return {
    name: 'fetch-plugin',
    setup({ onLoad }) {
      onLoad({ filter: /(^index\.js$)/ }, async (args) => ({
        loader: 'jsx',
        contents
      }))

      onLoad({ filter: /.*/ }, async (args) => {
        console.log('THis is a caching onLoad, will execute everytime')
        const cachedResult = await fileCache.getItem<OnLoadResult>(args.path)
        if (cachedResult) {
          return cachedResult
        }
      })

      onLoad({ filter: /.css$/ }, async (args) => {
        const { data, request } = await axios.get<string>(args.path)
        const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'")
        const contents = `
              const style = document.createElement('style');
              style.innerText=\`${escaped}\`;
              document.head.appendChild(style);
            `
        const result: OnLoadResult = {
          loader: 'jsx',
          contents: contents,
          resolveDir: new URL('./', request.responseURL).pathname
        }
        await fileCache.setItem(args.path, result)

        return result
      })

      onLoad({ filter: /.*/ }, async (args) => {
        const { data, request } = await axios.get<string>(args.path)
        console.log({ data })
        const result: OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        }
        await fileCache.setItem(args.path, result)

        return result
      })
    }
  }
}
