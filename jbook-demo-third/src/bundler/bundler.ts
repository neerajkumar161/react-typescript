import * as esbuild from 'esbuild-wasm'
import { fetchPlugin } from './plugins/fetch-plugin'
import { unpkgPathPlugin } from './plugins/unkpg-path-plugin'

let service: esbuild.Service

export const bundlerWrapper = async (rawCode: string): Promise<string> => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.57/esbuild.wasm'
    })
  }

  const result = await service.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: { 'process.env.NODE_ENV': '"production"', global: 'window' }
  })

  return result.outputFiles[0].text
}
