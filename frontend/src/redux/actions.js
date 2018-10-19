import { socket } from './';

export const socketEmit = (type, data, callback) => {
  return dispatch => {
    if(typeof callback === 'function')
      socket.emit(type, data, callback);
    else
      socket.emit(type, data);
    dispatch({
      type,
      data
    })
  }
}

export const socketOn = (type, event) => {
  return dispatch => {
    this.f = (data) => {
      dispatch({
        type,
        data
      })
    }
    socket.on(event, this.f);

    this.destroy = () => {
      socket.removeListener(event, this.f);
    }
  }
}
