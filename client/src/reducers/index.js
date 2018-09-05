import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
// import songReducer from './songReducer';
// import albumReducer from './albumReducer';
import errorReducer from './errorReducer';
import playlistReducer from './playlistReducer';
import controlsReducer from './controlsReducer';
import musicReducer from './musicReducer';

const mainReducer = combineReducers({
  playlists: musicReducer,
  currentlyPlaying: playlistReducer,
  controls: controlsReducer,
  errors: errorReducer
});

const createPlaylist = (state, action) => {
  switch(action.payload) {
    case 'browse':
      return {
        ...state,
        currentlyPlaying: {
          ...state.currentlyPlaying,
          tracks: state.songs.tracks
        }
      };

      case 'album':
        return {
          ...state,
          currentlyPlaying: {
            ...state.currentlyPlaying,
            tracks: state.playlists.album.tracks
          }
        };

      case 'artist':
        return {
          ...state,
          currentlyPlaying: {
            ...state.currentlyPlaying,
            tracks: state.playlists.artist.tracks
          }
        };

      case 'search':
        return {
          ...state,
          currentlyPlaying: {
            ...state.currentlyPlaying,
            tracks: state.playlists.search.tracks
          }
        };

    default:
      return state;
  }
}

const rootReducer = reduceReducers(createPlaylist, mainReducer);

export default rootReducer;
