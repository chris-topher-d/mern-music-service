import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlaylists, removeFromPlaylist } from '../../actions/playlistActions';

class PlaylistMenu extends Component {
  removeFromPlaylist = (playlistId, songId) => {
    this.props.removeFromPlaylist(playlistId, songId);
  }

  render() {
    return (
      <nav className='options-menu'>
        <p
          className='remove-track'
          onClick={() => {this.removeFromPlaylist(this.props.playlistId, this.props.songId)}}
        >
          Remove track from playlist
        </p>
        <input type='hidden' className='song-id' />
      </nav>
    );
  }
}

PlaylistMenu.propTypes = {
  music: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  music: state.music
});

export default connect(mapStateToProps, { getPlaylists, removeFromPlaylist })(PlaylistMenu);
