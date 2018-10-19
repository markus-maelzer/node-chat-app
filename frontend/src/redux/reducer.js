import { combineReducers } from 'redux';
import { USER } from './';

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

});
