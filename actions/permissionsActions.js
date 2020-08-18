import * as Permissions from 'expo-permissions'

const askPermissions = dispatch => {
  Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
  .then(resp => {
    if (resp.granted === true) {
      dispatch({type: 'PERMISSION_GRANTED'})
    } else {
      dispatch({type: 'PERMISSION_DENIED'})
    }
  })
}

const checkPermissions = () => {
  return dispatch => {
    Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    .then(resp => {
      if (resp.granted === true) {
        dispatch({type: 'PERMISSION_GRANTED'})
      } else if (resp.granted === false && resp.canAskAgain === true) {
        askPermissions(dispatch)
      } else {
        dispatch({type: 'PERMISSION_DENIED'})
      }
      dispatch({type: 'SET_CAN_ASK_AGAIN', payload: resp.canAskAgain})
    })
  }
}

export {
  checkPermissions
}