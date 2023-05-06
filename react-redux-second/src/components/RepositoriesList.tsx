import React, { useState } from 'react'
import { useActions } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'

export const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState<string>('')
  const { searchRepositories } = useActions()
  const { data, error, loading } = useTypedSelector((state) => state.repositories)
  /* We can use generics as well */
  // const { data, error, loading } = useSelector<TReducerState, TState>((state) => state.repositories)
  console.log('useSelectorState', data, error, loading)
  const onFormSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Break Changes in React, Lecture 44
    searchRepositories(term)
  }
  return (
    <div>
      Repositories List
      <form onSubmit={onFormSumbit}>
        <input type='text' value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading.....</h3>}
      {!error &&
        !loading &&
        data.map((el) => {
          return <h3>{el}</h3>
        })}
    </div>
  )
}
