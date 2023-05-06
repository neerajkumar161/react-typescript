import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { searchRepositories } from './../state/action-creators/actionCreators'
export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators({ searchRepositories }, dispatch)
  // return bindActionCreators({searchRepositories}, dispatch)
}
