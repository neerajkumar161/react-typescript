import ReactDom from 'react-dom'

const App = () => {
  return (
    <div>
      <h1>Hello there React App</h1>
    </div>
  )
}

ReactDom.render(<App />, document.querySelector('#root'))
