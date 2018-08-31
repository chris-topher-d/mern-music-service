import { LOAD_PLAYLIST } from './types';

export const loadPlaylist = (source, content) => dispatch => {
  console.log(source);
  return (
    dispatch({
      type: LOAD_PLAYLIST,
      payload: source,
      content: content
    })
  );
}
