export type TState = {
  loading: boolean
  error: string | null
  data: string[]
}

export type TAction =
  | { type: 'search_repositories'; payload: null }
  | { type: 'search_repositories_success'; payload: string[] }
  | { type: 'search_repositories_error'; payload: string }

export type TActionType = TAction['type']
