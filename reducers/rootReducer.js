import { combineReducers } from 'redux'
import permissions from './permissionsReducer'
import smoothiesState from './smoothiesReducer'

export default combineReducers({
  permissions,
  smoothiesState
})