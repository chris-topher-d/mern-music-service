import axios from 'axios';
import { GET_SONGS, GET_SONG, GET_ALBUM, GET_ARTIST, GET_ERRORS } from './types';

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

// Get album songs
export const getAlbum = (album, artist, artwork) => dispatch => {
  axios.get(`/api/album/${album}`)
    .then(res =>
      dispatch({
        type: GET_ALBUM,
        albumInfo: {album, artist, artwork},
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

// Get albums and songs by artist
export const getArtist = artist => dispatch => {
  axios.get(`/api/artist/${artist}`)
    .then(res =>
      dispatch({
        type: GET_ARTIST,
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
