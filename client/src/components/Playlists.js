import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { getPlaylists, getPlaylist, createPlaylist } from '../actions/playlistActions';
import playlistIcon from '../images/playlist_orange.png';

class Playlists extends Component {
  componentDidMount() {
    this.props.getPlaylists();
  }

  getPlaylist = playlistId => {
    this.props.getPlaylist(playlistId);
  }

  createPlaylist = () => {
    let newPlaylist = {
      playlist: prompt('Please enter the name of the new playlist')
    }

    if (newPlaylist !== null) {
      this.props.createPlaylist(newPlaylist);
    }
  }

  render() {
    const playlists = this.props.music.playlists.map((playlist, idx) => (
      <div key={idx} className='grid-item' role='link' tabIndex='0' onClick={() => {this.getPlaylist(playlist._id)}}>
        <Link to={`/playlists/${playlist.title}`}>
          <div className='playlist-image'>
            <img src={playlistIcon} alt='playlist-icon' />
          </div>
          <div className='grid-item-info'>
            {playlist.title}
          </div>
        </Link>
      </div>
    ));

    return (
      <div className='playlist-container'>
        <div className='grid-container'>
          <h2>Your Playlists</h2>
          <div className='playlist-results'>
            {playlists}
            <div className='add-playlist' onClick={this.createPlaylist}>
              <h4>ADD PLAYLIST</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Playlists.propTypes = {
  music: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  music: state.music
});

export default connect(mapStateToProps, { getPlaylists, getPlaylist, createPlaylist })(withRouter(Playlists));
