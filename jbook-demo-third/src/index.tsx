import ReactDom from 'react-dom'
import { CodeCell } from './components/code-cell'

const RootApp = () => {
  return (
    <div>
      <CodeCell />
    </div>
  )
}

ReactDom.render(<RootApp />, document.querySelector('#root'))
