import { LOAD_PLAYLIST, GET_PLAYLISTS, GET_PLAYLIST, CREATE_PLAYLIST, DELETE_PLAYLIST, GET_ERRORS } from './types';
import axios from 'axios';

export const loadPlaylist = (source, content) => dispatch => {
  return (
    dispatch({
      type: LOAD_PLAYLIST,
      payload: source,
      content: content
    })
  );
}

export const getPlaylists = () => dispatch => {
  axios.get('/api/playlists')
    .then(res =>
      dispatch({
        type: GET_PLAYLISTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const getPlaylist = playlist => dispatch => {
  axios.get(`/api/playlists/${playlist}`)
    .then(res =>
      dispatch({
        type: GET_PLAYLIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const createPlaylist = playlist => dispatch => {
  axios.post('/api/playlists/', playlist)
    .then(res =>
      dispatch({
        type: CREATE_PLAYLIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const deletePlaylist = playlistId => dispatch => {
  axios.delete(`/api/playlists/${playlistId}`)
    .then(res =>
      dispatch({
        type: DELETE_PLAYLIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
