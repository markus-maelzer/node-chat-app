import { combineReducers } from 'redux';
import { USER } from './';
import messagesReducer from '../components/chat/reducer';
// import _ from 'lodash';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER:
      return { ...state, ...action.data};

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  user: userReducer,
  messages: messagesReducer,

});
