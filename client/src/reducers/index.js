import { combineReducers } from 'redux';
import songReducer from './songReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  songs: songReducer,
  errors: errorReducer
});
