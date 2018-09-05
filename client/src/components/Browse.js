import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSongs, getAlbum } from '../actions/actions';
import { Link } from 'react-router-dom';

class Browse extends Component {
  componentWillMount() {
    this.props.getSongs();
  }

  onClick = (songId, album, artist, artwork) => {
    this.props.getAlbum(album, artist, artwork);
  }

  render() {
    const { tracks } = this.props.music.songs;

    let songList = tracks.map(song => (
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
  music: PropTypes.object.isRequired,
  getSongs: PropTypes.func.isRequired,
  getAlbum: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  music: state.music
});

export default connect(mapStateToProps, { getSongs, getAlbum })(Browse);
