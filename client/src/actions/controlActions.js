import { PLAY_SONG, UPDATE_INDEX, SET_PLAY, SHUFFLE_PLAY_ORDER, REPEAT_SONG } from './types';

export const playSong = index => dispatch => {
  return (
    dispatch({
      type: PLAY_SONG,
      index: index,
      payload: true
    })
  );
}

export const updateIndex = index => dispatch => {
  return (
    dispatch({
      type: UPDATE_INDEX,
      payload: index
    })
  );
}

export const setPlay = boolean => dispatch => {
  return (
    dispatch({
      type: SET_PLAY,
      payload: boolean
    })
  );
}

export const shufflePlayOrder = shuffledOrder => dispatch => {
  return (
    dispatch({
      type: SHUFFLE_PLAY_ORDER,
      payload: shuffledOrder
    })
  );
}
