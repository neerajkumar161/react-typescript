import ReactDom from 'react-dom'
import { App } from './components/App'

const RootApp = () => {
  return (
    <div>
      <h1>Hello there React Root</h1>
      <App />
    </div>
  )
}

ReactDom.render(<RootApp />, document.querySelector('#root'))
