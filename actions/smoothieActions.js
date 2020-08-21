import BACKEND_URL from '../constants/BACKEND_URL'

const fetchSmoothies = () => {
  return dispatch => {
    dispatch({type: 'START_REFRESHING'})
    fetch(`${BACKEND_URL}/api/v1/smoothies`)
    .then(resp => resp.json())
    .then(json => dispatch({type: 'SET_SMOOTHIES', payload: json}))
  }
}

const addSmoothie = smoothie => {
  return {type: 'ADD_SMOOTHIE', payload: smoothie}
}

export {
  fetchSmoothies,
  addSmoothie
}

