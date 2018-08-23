import axios from 'axios';
import { GET_SONGS, GET_SONG, GET_ERRORS } from './types';

// Get all songs
export const getSongs = () => dispatch => {
  axios.get('/api/songs/')
    .then(res =>
      dispatch({
        type: GET_SONGS,
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

export const getSong = (id) => dispatch => {
  axios.get(`/api/songs/${id}`)
    .then(res =>
      dispatch({
        type: GET_SONG,
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
