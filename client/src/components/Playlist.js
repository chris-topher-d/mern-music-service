import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { deletePlaylist } from '../actions/playlistActions';
import { getArtist } from '../actions/actions';

import playlistIcon from '../images/playlist_orange.png';

class Playlist extends Component {
  playSong = song => {
    console.log('Play Song');
  }

  deletePlaylist = id => {
    this.props.deletePlaylist(id);
    this.props.history.push('/playlists/');
  }

  getArtist = artist => {
    this.props.getArtist(artist);
  }

  render() {
    const trackList = this.props.music.playlists[0].tracks.map((track, idx) => (
      <li key={track._id} className='track-list-row'>
        <div className='track-count'>
          <i className='fas fa-play' onClick={this.playSong}></i>
          <span className='track-number'>{idx + 1}</span>
        </div>
        <div className='track-info'>
          <span className='track-name'>{track.title}</span>
          <Link to='/artist'>
            <span className='artist-name' onClick={() => {this.getArtist(track.artist)}}>{track.artist}</span>
          </Link>
        </div>
        <div className='track-options'>
          <input type='hidden' className='song-id' value='' />
          <i className='fas fa-ellipsis-h'></i>
        </div>
        <div className='track-length'>
          <span className='duration'>{track.duration}</span>
        </div>
      </li>
    ));

    return (
      <div className='playlist-container'>
        <div className='playlist-info'>
          <div className='album-info-top'>
            <div className='left-section'>
              <div className='playlist-icon'>
                <img src={playlistIcon} alt='Playlist Icon' />
              </div>
            </div>
            <div className='right-section'>
              <h2 className='playlist-name'>{this.props.music.playlists[0].title}</h2>
              {/* <p>by User</p> */}
              {/* <p>Track Count</p> */}
              <button className='button' onClick={() => {this.deletePlaylist(this.props.music.playlists[0]._id)}}>Delete Playlist</button>
            </div>
          </div>
          <div className='tracks-container'>
            <ul className='track-list'>
              {/* <li className='track-list-row'>
                <div className='track-count'>
                  <i className='fas fa-play' onClick={this.playSong}></i>
                  <span className='track-number'>Track Number</span>
                </div>
                <div className='track-info'>
                  <span className='track-name'>Track Name</span>
                  <span className='artist-name'>Artist</span>
                </div>
                <div className='track-options'>
                  <input type='hidden' className='song-id' value='' />
                  <i className='fas fa-ellipsis-h'></i>
                </div>
                <div className='track-length'>
                  <span className='duration'>Song Duration</span>
                </div>
              </li> */}
              {trackList}
            </ul>
          </div>
          {/* popup menu for each track */}
          {/* <nav class='options-menu'>
            <input type='hidden' class='song-id'>
            <div class='item' onClick={this.removeFromPlaylist})'>Remove from playlist</div>
          </div> */}
        </div>
      </div>
    );
  }
}

Playlist.propTypes = {
  music: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  music: state.music
});

export default connect(mapStateToProps, { deletePlaylist, getArtist })(withRouter(Playlist));
