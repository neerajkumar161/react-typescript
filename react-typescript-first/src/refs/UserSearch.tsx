import { useEffect, useRef, useState } from 'react'

export type TUser = {
  name: string
  age: number
}

const users: TUser[] = [
  {
    name: 'Neeraj',
    age: 12
  },
  {
    name: 'Rohit',
    age: 14
  },
  {
    name: 'Stephen',
    age: 15
  }
]

export const UserSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [name, setName] = useState<string>('')
  const [user, setUser] = useState<TUser>()

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  const onClickSearch = () => {
    setUser(users.find((el) => el.name === name))
  }

  return (
    <div>
      <h2>User Name: {user && user?.name}</h2>
      <h3>User Age: {user && user?.age}</h3>
      <input ref={inputRef} type='text' value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={onClickSearch}>Find User</button>
    </div>
  )
}
