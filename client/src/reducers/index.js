import { combineReducers } from 'redux';
import songReducer from './songReducer';
import albumReducer from './albumReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  songs: songReducer,
  album: albumReducer,
  errors: errorReducer
});
