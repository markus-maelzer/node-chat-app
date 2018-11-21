import { socket } from './';

export const socketEmit = (type, event, data, callback) => {
  return dispatch => {
    if(typeof callback === 'function')
      socket.emit(event, data, callback);
    else
      socket.emit(event, data);
    dispatch({
      type,
      data
    })
  }
}

export const socketOn = (type, event) => {
  return dispatch => {
    var f = (data) => {
      dispatch({
        type,
        data
      })
    }
    socket.on(event, f);

    return () => {
      socket.removeListener(event, f);
    }
  }
}

export const simpleAction = (type, data) => {
  console.log(data);
  return {
    type,
    data
  }
}
