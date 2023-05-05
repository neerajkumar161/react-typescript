import ReactDom from 'react-dom'
import { EventComponent } from './events/EventComponent'
import { Parent } from './props/Parent'
import { UserSearch } from './refs/UserSearch'
import { GuestList } from './state/GuestList'

const App = () => {
  return (
    <div>
      <h1>Hello there React App</h1>
      <Parent />
      <GuestList />
      <UserSearch />
      <EventComponent />
    </div>
  )
}

ReactDom.render(<App />, document.querySelector('#root'))
