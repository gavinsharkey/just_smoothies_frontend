export default (state = [], action) => {
  switch (action.type) {
    case 'SET_SMOOTHIES':
      return action.payload
    case 'ADD_SMOOTHIE':
      return [
        action.payload,
        ...state
      ]
    default:
      return state
  }
}