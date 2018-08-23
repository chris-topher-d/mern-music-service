import { GET_ALBUM } from '../actions/types';

const initialState = {
  album: '',
  songs: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ALBUM:
      return {
        album: action.album,
        songs: action.payload
      };

    default:
      return state;
  }
}
