import { GET_SONGS, GET_ALBUM, GET_ARTIST, SEARCH_FOR_ITEM, GET_PLAYLISTS, GET_PLAYLIST, CREATE_PLAYLIST, DELETE_PLAYLIST } from '../actions/types';

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
  },
  playlists: []
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

    case GET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload
      };

    case GET_PLAYLIST:
      return {
        ...state,
        playlists: [action.payload]
      };

    case CREATE_PLAYLIST:
      return {
        ...state,
        playlists: [
          ...state.playlists,
          action.payload
        ]
      };

    case DELETE_PLAYLIST:
      return {
        ...state,
        playlists: state.playlists.filter(playlist => playlist._id !== action.payload._id)
      };

    default:
      return state;
  }
}
