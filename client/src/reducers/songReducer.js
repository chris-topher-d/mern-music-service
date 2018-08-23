import { GET_SONGS, GET_SONG } from '../actions/types';

const initialState = {
  songs: [],
  song: {}
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_SONGS:
      return {
        ...state,
        songs: action.payload
      };

    case GET_SONG:
      return {
        ...state,
        song: action.payload
      };

    default:
      return state;
  }
}
