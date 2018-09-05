import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
// import songReducer from './songReducer';
// import albumReducer from './albumReducer';
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
          tracks: state.songs.tracks
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

    default:
      return state;
  }
}

const rootReducer = reduceReducers(createPlaylist, mainReducer);

export default rootReducer;
