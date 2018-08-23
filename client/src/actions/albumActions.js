import axios from 'axios';
import { GET_ALBUM, GET_ERRORS } from './types';

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

// Get album info
// export const getAlbumInfo = (album, artist) => dispatch => {
//   axios.get(`/api/album/${album}`)
//     .then(res =>
//       dispatch({
//         type: GET_ALBUM_INFO,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// }
