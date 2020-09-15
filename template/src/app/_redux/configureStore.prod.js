import {createStore} from 'redux'
import rootReducer from '../Containers/rootReducer'

const configureStore = preloadedState => {
  return createStore(
    rootReducer,
    preloadedState,
  )
}

export default configureStore
