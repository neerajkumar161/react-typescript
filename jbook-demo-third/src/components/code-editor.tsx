import Editor, { EditorDidMount } from '@monaco-editor/react'
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import CodeShift from 'jscodeshift'
import { editor } from 'monaco-editor'
import Highlighter from 'monaco-jsx-highlighter'
import Prettier from 'prettier'
import BabelParser from 'prettier/parser-babel'
import { useRef } from 'react'
import './code-editor.css'
import './syntax.css'

type CodeEditorProps = {
  onChange: (input: string) => void
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ onChange }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>()

  const onEditorDidMount: EditorDidMount = (getEditorvalue, editor) => {
    editorRef.current = editor
    editor.onDidChangeModelContent((e) => {
      onChange(editorRef.current!.getValue())
    })

    editor.getModel()?.updateOptions({ tabSize: 2 })
    const highlighter = new Highlighter(window.monaco, CodeShift, editor)
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    )
  }

  const onClickFormat = () => {
    const unformattedCode = editorRef.current?.getModel()?.getValue()

    if (unformattedCode) {
      const formatted = Prettier.format(unformattedCode, {
        parser: 'babel',
        plugins: [BabelParser],
        semi: false,
        singleQuote: true
      })

      editorRef.current?.setValue(formatted)
    }
  }

  return (
    <div className='editor-wrapper'>
      <button className='button button-format is-primary is-small' onClick={onClickFormat}>
        Format Code
      </button>

      <Editor
        editorDidMount={onEditorDidMount}
        height='500px'
        language='javascript'
        theme='dark'
        options={{
          wordWrap: 'on',
          lineNumbersMinChars: 3,
          automaticLayout: true
        }}
      />
    </div>
  )
}
