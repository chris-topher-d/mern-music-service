import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { loadPlaylist, deletePlaylist } from '../actions/playlistActions';
import { getArtist } from '../actions/actions';
import { playSong } from '../actions/controlActions';
import Spinner from './common/Spinner';
import PlaylistMenu from './common/PlaylistMenu';
import playlistIcon from '../images/playlist-record-lg.jpg';

class Playlist extends Component {
  play = (index, content) => {
    this.props.loadPlaylist('playlist', content);
    this.props.playSong(index);
  }

  deletePlaylist = playlistId => {
    this.props.deletePlaylist(playlistId);
  }

  getArtist = artist => {
    this.props.getArtist(artist);
  }

  render() {
    let index, playlistContent;
    this.props.controls.index === null ? index = 0 : index = this.props.controls.index;
    const playingStyle = {background: '#f2f2f2'};

    const trackList = this.props.music.playlists[0].tracks.map((track, idx) => (
      <li
        key={track._id + idx}
        className='track-list-row'
        style={this.props.currentlyPlaying.tracks[index] !== undefined && this.props.currentlyPlaying.tracks[index].title === track.title ? playingStyle : null}
      >
        <div className='track-count'>
          <i className='fas fa-play' onClick={() => {this.play(idx, this.props.music.playlists[0].title)}}></i>
          <span className='track-number'>{idx + 1}</span>
        </div>
        <div className='track-info'>
          <span className='track-name'>{track.title}</span>
          <Link to='/artist'>
            <span className='artist-name' onClick={() => {this.getArtist(track.artist)}}>{track.artist}</span>
          </Link>
        </div>
        <div className='track-options'>
          <i className='fas fa-ellipsis-h'></i>
          <PlaylistMenu playlistId={this.props.music.playlists[0]._id} songId={track._id} />
        </div>
        <div className='track-length'>
          <span className='duration'>{track.duration}</span>
        </div>
      </li>
    ));

    if (this.props.music.loading) {
      playlistContent = (
        <div className='playlist-info' style={{padding: '0'}}>
          <Spinner />
        </div>
      );
    } else {
      playlistContent = (
        <div className='playlist-info'>
          <div className='album-info-top'>
            <div className='left-section'>
              <div className='playlist-icon'>
                <img src={playlistIcon} alt='Playlist Icon' />
              </div>
            </div>
            <div className='right-section'>
              <div className='playlist-details'>
                <h2 className='playlist-name'>{this.props.music.playlists[0].title}</h2>
                <p>{this.props.music.playlists[0].tracks.length} {this.props.music.playlists[0].tracks.length > 1 ? 'tracks' : 'track'}</p>
              </div>
              <Link to='/playlists'>
                <button className='button' onClick={() => {this.deletePlaylist(this.props.music.playlists[0]._id)}}>Delete Playlist</button>
              </Link>
            </div>
          </div>
          <div className='tracks-container'>
            <ul className='track-list'>
              {trackList}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className='playlist-container'>
        {playlistContent}
      </div>
    );
  }
}

Playlist.propTypes = {
  music: PropTypes.object.isRequired,
  currentlyPlaying: PropTypes.object.isRequired,
  controls: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  music: state.music,
  currentlyPlaying: state.currentlyPlaying,
  controls: state.controls
});

export default connect(mapStateToProps, { loadPlaylist, deletePlaylist, getArtist, playSong })(Playlist);
