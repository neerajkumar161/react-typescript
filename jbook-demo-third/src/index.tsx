import * as esbuild from 'esbuild-wasm'
import { useEffect, useRef, useState } from 'react'
import ReactDom from 'react-dom'
import { unpkgPathPlugin } from './plugins/unkpg-path-plugin'

const RootApp = () => {
  const ref = useRef<esbuild.Service>()
  const [input, setInput] = useState<string>('')
  const [code, setCode] = useState<string>('')

  const startService = async () => {
    ref.current = await esbuild.startService({ worker: true, wasmURL: '/esbuild.wasm' })
  }

  const onSubmit = async () => {
    if (!ref.current) return

    console.log(ref.current)
    // const result = await ref.current.transform(input, { loader: 'jsx', target: 'es2015' })
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
      define: { 'process.env.NODE_ENV': '"production"', global: 'window' }
    })
    console.log({ result })

    setCode(result.outputFiles[0].text)
  }

  useEffect(() => {
    startService()
  }, [])

  return (
    <div>
      <textarea name='' id='' cols={30} rows={10} onChange={(e) => setInput(e.target.value)} value={input}></textarea>
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  )
}

ReactDom.render(<RootApp />, document.querySelector('#root'))
