import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSongs, getSong } from '../actions/songActions';
import { getAlbum } from '../actions/albumActions';
import { Link } from 'react-router-dom';

class Browse extends Component {
  componentWillMount() {
    this.props.getSongs();
  }

  onClick = (songId, album, artist, artwork) => {
    this.props.getSong(songId);
    this.props.getAlbum(album, artist, artwork);
  }

  render() {
    const { songs } = this.props.songs;
    // console.log(songs);

    let songList = songs.map(song => (
      <div className='song' key={song._id}>
        <Link to='/album'>
          <span role='link' tabIndex='0' onClick={() => {this.onClick(song._id, song.album, song.artist, song.artwork)}}>
            <img src={song.artwork} alt='album cover'/>
            <div className='song-title'>
              <p>{song.title}</p>
            </div>
          </span>
        </Link>
      </div>
    ));

    return (
      <div className='browse-container'>
        <div className='browse-songs'>
          {songList}
        </div>
      </div>
    );
  }
}

Browse.propTypes = {
  getSongs: PropTypes.func.isRequired,
  getSong: PropTypes.func.isRequired,
  getAlbum: PropTypes.func.isRequired,
  songs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  songs: state.songs
});

export default connect(mapStateToProps, { getSongs, getSong, getAlbum })(Browse);
