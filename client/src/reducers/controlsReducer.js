import { PLAY_SONG, UPDATE_INDEX, SET_PLAY } from '../actions/types';

const initialState = {
  play: false,
  index: 0
};

export default function(state = initialState, action) {
  switch(action.type) {
    case PLAY_SONG:
      return {
        play: true,
        index: action.index
      };

    case UPDATE_INDEX:
      return {
        ...state,
        index: action.payload
      };

    case SET_PLAY:
      return {
        ...state,
        play: action.payload
      };

    default:
      return state;
  }
}
