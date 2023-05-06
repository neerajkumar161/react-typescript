import { TState } from '../actions/types'
import { TAction } from './../actions/types'

export const repositoriesReducer = (
  state: TState = { loading: false, error: null, data: [] },
  action: TAction
): TState => {
  switch (action.type) {
    case 'search_repositories':
      return { loading: true, error: null, data: [] }
    case 'search_repositories_success':
      return { loading: false, error: null, data: action.payload }
    case 'search_repositories_error':
      return { loading: false, error: action.payload, data: [] }
    default:
      return state
  }
}
