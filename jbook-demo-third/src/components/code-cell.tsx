import { useState } from 'react'
import { bundlerWrapper } from '../bundler/bundler'
import { CodeEditor } from './code-editor'
import { Preview } from './preview'

export const CodeCell: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const [code, setCode] = useState<string>('')

  const onSubmit = async () => {
    const compiledCode = await bundlerWrapper(input)
    setCode(compiledCode)
  }

  const onChangeEditorContent = (input: string) => {
    console.log('Content Changed inside editor', input)
    setInput(input)
  }

  return (
    <div>
      <CodeEditor onChange={onChangeEditorContent} />
      {/* <textarea name='' id='' cols={30} rows={10} value={input}></textarea> */}
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  )
}

