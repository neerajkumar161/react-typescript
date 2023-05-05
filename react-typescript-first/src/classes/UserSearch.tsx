import { Component, ReactNode } from 'react'
import { TUser } from '../state/UserSearch'

type TUserProps = { users: TUser[] }
type TState = { name: string; user: TUser }

export class UserSearch extends Component<TUserProps> {
  state: TState = {
    name: 'Default User',
    user: { name: 'First', age: 20 }
  }

  onClickSearch = () => {
    const user = this.props.users.find((el) => el.name === this.state.name)
    this.setState({ user })
  }

  render(): ReactNode {
    // this.state.name = 'Default User'
    const { name, user } = this.state
    return (
      <div>
        <h2>User Name: {user && user.name}</h2>
        <h3>User Age: {user && user.age}</h3>
        <input type='text' value={name} onChange={(e) => this.setState({ name: e.target.value })} />
        <button onClick={this.onClickSearch}>Find User</button>
      </div>
    )
  }
}
