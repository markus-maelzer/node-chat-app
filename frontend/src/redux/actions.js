import { socket } from './';

export const socketEmit = (type, event, data) => {
  return dispatch => {
    socket.emit(event, data);
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
