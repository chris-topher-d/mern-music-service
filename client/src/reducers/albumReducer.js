import { GET_ALBUM } from '../actions/types';

const initialState = {
  albumInfo: {},
  songs: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ALBUM:
      return {
        albumInfo: action.albumInfo,
        songs: action.payload
      };

    default:
      return state;
  }
}
