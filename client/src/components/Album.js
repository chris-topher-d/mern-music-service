import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadPlaylist } from '../actions/playlistActions';
import { playSong } from '../actions/controlActions';

class Album extends Component {
  play = (index, content) => {
    this.props.loadPlaylist('album', content);
    this.props.playSong(index);
  }

  showMenu = () => {

  }

  render() {
    const { tracks } = this.props.music.album;
    const albumInfo = this.props.music.album.tracks.reduce((acc, next) => {
      acc = {album: next.album, artist: next.artist, artwork: next.artwork};
      return acc;
    }, {});
    const playingStyle = {background: '#f2f2f2'};
    let index;
    this.props.controls.index === null ? index = 0 : index = this.props.controls.index;

    const trackList = tracks.map((song, idx) => (
      <li
        className='track-list-row'
        key={song._id}
        style={this.props.currentlyPlaying.tracks[index] !== undefined && this.props.currentlyPlaying.tracks[index].title === song.title ? playingStyle : null}
      >
        <div className='track-count'>
          <i className='fas fa-play' onClick={() => {this.play(idx, song.album)}}></i>
          <span className='track-number'>{idx + 1}</span>
        </div>
        <div className='track-info'>
          <span className='track-name'>{song.title}</span>
        </div>
        <div className='track-options'>
          <input type='hidden' className='song-id' value=''/>
          <i className='fas fa-ellipsis-h' onClick={this.showMenu}></i>
        </div>
        <div className='track-length'>
          <span className='duration'>{song.duration}</span>
        </div>
      </li>
    ));

    return(
      <div className='album-container'>
        <div className='album-info-top'>
          <div className='left-section'>
            <img src={albumInfo.artwork} alt='album cover'/>
          </div>
          <div className='right-section'>
            <h2>{albumInfo.album}</h2>
            <p>by {albumInfo.artist}</p>
            <p>{tracks.length} tracks available</p>
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
}

Album.propTypes = {
  loadPlaylist: PropTypes.func.isRequired,
  playSong: PropTypes.func.isRequired,
  music: PropTypes.object.isRequired,
  currentlyPlaying: PropTypes.object.isRequired,
  controls: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  music: state.music,
  currentlyPlaying: state.currentlyPlaying,
  controls: state.controls
});

export default connect(mapStateToProps, { loadPlaylist, playSong })(Album);
