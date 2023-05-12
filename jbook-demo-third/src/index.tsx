import * as esbuild from 'esbuild-wasm'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import ReactDom from 'react-dom'
import { CodeEditor } from './components/code-editor'
import { fetchPlugin } from './plugins/fetch-plugin'
import { unpkgPathPlugin } from './plugins/unkpg-path-plugin'

const RootApp = () => {
  const ref = useRef<esbuild.Service>()
  const iFrameRef = useRef<any>()
  const [input, setInput] = useState<string>('')

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    })
  }

  const onSubmit = async () => {
    if (!ref.current) return

    iFrameRef.current!.srcdoc = html
    console.log(ref.current)

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: { 'process.env.NODE_ENV': '"production"', global: 'window' }
    })
    console.log({ result })
    if (iFrameRef.current) {
      iFrameRef.current.contentWindow!.postMessage(result.outputFiles[0].text, '*')
    }
  }

  const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    // npm install --save-exact @monaco-editor/react@3.7.5 --legacy-peer-deps
    // onSubmit(e.target.value)
  }

  const onChangeEditorContent = (input: string) => {
    console.log('Content Changed inside editor', input)
  }
  
  useEffect(() => {
    startService()
  }, [])

  const html = `
  <html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data)
        } catch (error) {
          const rootEl = document.querySelector('#root')
          rootEl.innerHTML = '<div style="color: red">Error Occured' + error + '</div>'
          console.error(error)
          throw err
        }
      }, false)
    </script>
  </body>
  </html>
  `
  return (
    <div>
      <CodeEditor onChange={onChangeEditorContent}/>
      <textarea name='' id='' cols={30} rows={10} onChange={onChangeTextArea} value={input}></textarea>
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <iframe ref={iFrameRef} srcDoc={html} sandbox='allow-scripts' title='iFrame' />
    </div>
  )
}

ReactDom.render(<RootApp />, document.querySelector('#root'))
