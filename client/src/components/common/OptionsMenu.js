import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlaylists, addToPlaylist } from '../../actions/playlistActions';

class OptionsMenu extends Component {
  componentWillMount() {
    this.props.getPlaylists();
  }

  addToPlaylist = (playlistId, songId) => {
    this.props.addToPlaylist(playlistId, songId);
  }

  render() {
    const playlists = this.props.music.playlists.map(playlist => (
      <p
        key={playlist._id}
        className='playlist'
        onClick={() => {this.addToPlaylist(playlist._id, this.props.songId)}}
      >
        {playlist.title}
      </p>
    ));

    return (
      <nav className='options-menu'>
        <p className='header'>Add track to playlist:</p>
        {playlists}
        <input type='hidden' className='song-id' />
      </nav>
    );
  }
}

OptionsMenu.propTypes = {
  music: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  music: state.music
});

export default connect(mapStateToProps, { getPlaylists, addToPlaylist })(OptionsMenu);
