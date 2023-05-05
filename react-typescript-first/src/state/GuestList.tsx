import React, { useState } from 'react'

export const GuestList: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [guests, setGuests] = useState<string[]>([])

  const onClickAddGuest = () => {
    setGuests([...guests, name])
    setName('')
  }
  return (
    <div>
      <h3>Guest List</h3>
      <ul>
        {guests.map((el) => {
          return <li>{el}</li>
        })}
      </ul>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={onClickAddGuest}>Add Guest</button>
    </div>
  )
}
