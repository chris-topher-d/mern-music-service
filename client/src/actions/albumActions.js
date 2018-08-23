import axios from 'axios';
import { GET_ALBUM, GET_ERRORS } from './types';

export const getAlbum = (album) => dispatch => {
  axios.get(`/api/album/${album}`)
    .then(res =>
      dispatch({
        type: GET_ALBUM,
        album: album,
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
