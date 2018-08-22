import { GET_SONGS } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case GET_SONGS:
      return action.payload;

    default:
      return state;
  }
}
