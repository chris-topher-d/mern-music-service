import {
  GET_SONGS,
  GET_ALBUM,
  GET_ARTIST,
  SEARCH_FOR_ITEM,
  GET_PLAYLISTS,
  GET_PLAYLIST,
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  PAGE_LOADING
} from '../actions/types';

const initialState = {
  loading: false,
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
        loading: false,
        search: {
          tracks: action.payload,
          searchTerm: action.searchTerm
        }
      };

    case GET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
        loading: false
      };

    case GET_PLAYLIST:
      return {
        ...state,
        playlists: [action.payload],
        loading: false
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

    case REMOVE_FROM_PLAYLIST:
      return {
        ...state,
        playlists: [{
          ...state.playlists[0],
          tracks: state.playlists[0].tracks.filter(track => track._id !== action.songId)
        }]
      }

    case PAGE_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
