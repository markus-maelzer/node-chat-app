import { combineReducers } from 'redux';
import { USER, CREATE_MESSAGE } from './';
import _ from 'lodash';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER:
      return { ...state, ...action.data};

    default:
      return state;
  }
}
const messagesReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_MESSAGE:
      return { ...state, [action.data.createdAt]: action.data};

    default:
      return state;
  }
}


export const rootReducer = combineReducers({
  user: userReducer,
  messages: messagesReducer,

});
