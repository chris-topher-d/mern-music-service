import { LOAD_PLAYLIST, GET_SONGS } from '../actions/types';

const initialState = {
  tracks: [],
  loaded: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case LOAD_PLAYLIST:
      return {
        ...state,
        loaded: true
      };

    // On initial site load, fill current paylist with songs
    case GET_SONGS:
      if (state.tracks.length === 0) {
        return {
          tracks: action.payload,
          loaded: true
        };
      }

    default:
      return state;
  }
}
