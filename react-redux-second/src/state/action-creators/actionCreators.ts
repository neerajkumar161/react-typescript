import axios from 'axios'
import { Dispatch } from 'react'
import { TAction } from './../actions/types'

type TRepository = {
  objects: Array<{
    package: {
      name: string
      description: string
      version: string
    }
  }>
}

export const searchRepositories = (term: string) => {
  return async (disptach: Dispatch<TAction>) => {
    try {
      disptach({
        type: 'search_repositories',
        payload: null
      })
      const { data } = await axios.get<TRepository>(`https://registry.npmjs.org/-/v1/search?text=${term}`)
      const names = data.objects.map((el) => el.package.name)

      disptach({
        type: 'search_repositories_success',
        payload: names
      })
    } catch (error) {
      if (error instanceof Error) {
        disptach({ type: 'search_repositories_error', payload: 'Error Occured!' })
      }
    }
  }
}
