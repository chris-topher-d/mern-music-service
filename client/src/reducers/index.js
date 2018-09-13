import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import errorReducer from './errorReducer';
import currentlyPlaying from './currentlyPlayingReducer';
import controlsReducer from './controlsReducer';
import musicReducer from './musicReducer';

const mainReducer = combineReducers({
  music: musicReducer,
  currentlyPlaying: currentlyPlaying,
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
          tracks: state.music.songs.tracks
        }
      };

      case 'album':
        return {
          ...state,
          currentlyPlaying: {
            ...state.currentlyPlaying,
            tracks: state.music.album.tracks
          }
        };

      case 'artist':
        return {
          ...state,
          currentlyPlaying: {
            ...state.currentlyPlaying,
            tracks: state.music.artist.tracks
          }
        };

      case 'search':
        return {
          ...state,
          currentlyPlaying: {
            ...state.currentlyPlaying,
            tracks: state.music.search.tracks
          }
        };

      case 'playlist':
        return {
          ...state,
          currentlyPlaying: {
            ...state.currentlyPlaying,
            tracks: state.music.playlists[0].tracks
          }
        };

    default:
      return state;
  }
}

const rootReducer = reduceReducers(createPlaylist, mainReducer);

export default rootReducer;
