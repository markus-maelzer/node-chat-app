import { NEW_MESSAGE } from './types';

const messagesReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return {...state, [action.data.createdAt]: action.data}

    default:
      return state;
  }
}
export default messagesReducer;
