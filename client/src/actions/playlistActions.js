import {
  LOAD_PLAYLIST,
  GET_PLAYLISTS,
  GET_PLAYLIST,
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  PAGE_LOADING,
  GET_ERRORS
} from './types';
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
  dispatch(pageLoading());
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

export const getPlaylist = playlistId => dispatch => {
  dispatch(pageLoading());
  axios.get(`/api/playlists/${playlistId}`)
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

export const addToPlaylist = (playlistId, songId) => dispatch => {
  axios.post(`/api/playlists/${playlistId}/${songId}`)
    .then(res =>
      dispatch({
        type: ADD_TO_PLAYLIST,
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

export const removeFromPlaylist = (playlistId, songId) => dispatch => {
  axios.delete(`/api/playlists/${playlistId}/${songId}`)
    .then(res =>
      dispatch({
        type: REMOVE_FROM_PLAYLIST,
        payload: res.data,
        songId: songId
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Set loading state to true
export const pageLoading = () => {
  return {
    type: PAGE_LOADING
  };
}
