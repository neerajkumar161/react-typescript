// https://www.npmjs.com/package/monaco-jsx-highlighter/v/0.0.15
declare module 'monaco-jsx-highlighter' {
  import JSCodeShift from 'jscodeshift'
  import Monaco, { editor } from 'monaco-editor'

  type TMonacoEditor = () => typeof Monaco.editor.create
  type TJSCodeShift = typeof JSCodeShift
  type TMonaco = typeof Monaco
  type highlightProps = (
    afterHighlight?: () => void,
    onError?: () => void,
    getAstPromise?: (() => void) | undefined,
    onJsCodeShiftErrors?: () => void
  ) => () => void

  
  export default class Highlighter {
    constructor(monaco: TMonaco, jscodeshift: TJSCodeShift, editorFunction: editor.IStandaloneCodeEditor)

    highLightOnDidChangeModelContent: highlightProps
    addJSXCommentCommand: () => () => void
  }
}

interface Window {
  monaco: any
}
