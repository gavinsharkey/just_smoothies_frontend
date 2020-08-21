export default (state = {
  smoothies: [],
  isRefreshing: false
}, action) => {
  switch (action.type) {
    case 'START_REFRESHING':
      return {
        smoothies: [...state.smoothies],
        isRefreshing: true
      }
    case 'SET_SMOOTHIES':
      return {
        isRefreshing: false,
        smoothies: action.payload
      }
    case 'ADD_SMOOTHIE':
      return {
        ...state,
        smoothies: [ action.payload, ...state.smoothies]
      }
    default:
      return state
  }
}