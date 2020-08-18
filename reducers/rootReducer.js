import { combineReducers } from 'redux'
import permissions from './permissionsReducer'
import smoothies from './smoothiesReducer'

export default combineReducers({
  permissions,
  smoothies
})