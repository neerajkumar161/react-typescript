type TState = {
  loading: boolean
  error: string | null
  data: string[]
}

type TAction = {
  type: 'search_repositories' | 'search_repositories_success' | 'search_repositories_error'
  payload: any
}

export const reducer = (state: TState, action: TAction): TState => {
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
