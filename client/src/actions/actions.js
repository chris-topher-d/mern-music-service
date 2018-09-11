import axios from 'axios';
import {
  GET_SONGS,
  GET_ALBUM,
  GET_ARTIST,
  SEARCH_FOR_ITEM,
  PAGE_LOADING,
  GET_ERRORS
} from './types';

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

// Get album songs
export const getAlbum = (album, artist, artwork) => dispatch => {
  dispatch(pageLoading());
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
  dispatch(pageLoading());
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

// Search DB for matching terms
export const searchFor = item => dispatch => {
  dispatch(pageLoading());
  axios.get(`/api/search/${item}`)
    .then(res =>
      dispatch({
        type: SEARCH_FOR_ITEM,
        searchTerm: item,
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

export const pageLoading = () => {
  return {
    type: PAGE_LOADING
  };
}
