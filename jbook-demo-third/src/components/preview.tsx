import React, { useEffect, useRef } from 'react'

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

type PreviewProps = { code: string }

export const Preview: React.FC<PreviewProps> = (props) => {
  const iFrameRef = useRef<any>()

  useEffect(() => {
    iFrameRef.current!.srcdoc = html
    if (iFrameRef.current) {
      iFrameRef.current.contentWindow!.postMessage(props.code, '*')
    }
  }, [props.code])

  return <iframe ref={iFrameRef} srcDoc={html} sandbox='allow-scripts' title='iFrame' />
}
