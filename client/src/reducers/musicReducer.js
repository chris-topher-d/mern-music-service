import { GET_SONGS, GET_ALBUM, GET_ARTIST, SEARCH_FOR_ITEM } from '../actions/types';

const initialState = {
  songs: {
    tracks: []
  },
  album: {
    tracks: [],
    albumInfo: {}
  },
  artist: {
    tracks: []
  },
  search: {
    tracks: [],
    searchTerm: ''
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

    case GET_ALBUM:
      return {
        ...state,
        album: {
          tracks: action.payload,
          albumInfo: action.albumInfo
        }
      };

    case GET_ARTIST:
      return {
        ...state,
        artist: {
          tracks: action.payload
        }
      };

    case SEARCH_FOR_ITEM:
      return {
        ...state,
        search: {
          tracks: action.payload,
          searchTerm: action.searchTerm
        }
      };

    default:
      return state;
  }
}
