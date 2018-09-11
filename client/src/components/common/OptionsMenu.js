import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToPlaylist } from '../../actions/playlistActions';

class OptionsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }

  addToPlaylist = (playlistId, songId) => {
    this.setState({clicked: playlistId});
    this.props.addToPlaylist(playlistId, songId);
  }

  render() {
    const { clicked } = this.state;

    const playlists = this.props.music.playlists.map(playlist => (
      <p
        key={playlist._id}
        className={clicked === playlist._id ? 'playlist clicked' : 'playlist'}
        onClick={() => {this.addToPlaylist(playlist._id, this.props.songId)}}
        onAnimationEnd={() => this.setState({clicked: false})}
      >
        {playlist.title}
      </p>
    ));

    return (
      <nav className='options-menu'>
        <p className='header'>Add track to playlist</p>
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

export default connect(mapStateToProps, { addToPlaylist })(OptionsMenu);
