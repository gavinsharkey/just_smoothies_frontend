export default (state = {
  granted: false, status: 'pending', canAskAgain: false
}, action) => {
  switch (action.type) {
    case 'PERMISSION_GRANTED':
      return {
        ...state,
        status: 'resolved',
        granted: true
      }
    case 'PERMISSION_DENIED':
      return {
        ...state,
        status: 'rejected',
        granted: false
      }
    case 'SET_CAN_ASK_AGAIN':
      return {
        ...state,
        canAskAgain: action.payload
      }
    default:
      return state
  }
}