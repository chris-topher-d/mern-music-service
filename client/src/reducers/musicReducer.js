import { GET_SONGS, GET_SONG, GET_ALBUM } from '../actions/types';

const initialState = {
  songs: {
    tracks: [],
    song: {},
  },
  album: {
    tracks: [],
    albumInfo: {}
  }
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_SONGS:
      return {
        ...state,
        songs: {
          ...state.songs,
          tracks: action.payload
        }
      };

    case GET_SONG:
      return {
        ...state,
        songs: {
          ...state.songs,
          song: action.payload
        }
      };

    case GET_ALBUM:
      return {
        ...state,
        album: {
          tracks: action.payload,
          albumInfo: action.albumInfo
        }
      };

    default:
      return state;
  }
}
