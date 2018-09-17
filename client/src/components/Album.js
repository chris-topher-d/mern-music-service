import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { loadPlaylist, getPlaylists } from '../actions/playlistActions';
import { getArtist } from '../actions/actions';
import { playSong } from '../actions/controlActions';
import Spinner from './common/Spinner';
import OptionsMenu from './common/OptionsMenu';

class Album extends Component {
  componentWillMount() {
    this.props.getPlaylists();
  }

  play = (index, content) => {
    this.props.loadPlaylist('album', content);
    this.props.playSong(index);
  }

  getArtist = artist => {
    this.props.getArtist(artist);
  }

  render() {
    const { tracks } = this.props.music.album;
    const albumInfo = this.props.music.album.tracks.reduce((acc, next) => {
      acc = {album: next.album, artist: next.artist, artwork: next.artwork};
      return acc;
    }, {});
    const playingStyle = {background: '#f2f2f2'};
    let index, albumContent;
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
          <i className='fas fa-ellipsis-h'></i>
          <OptionsMenu songId={song._id} />
        </div>
        <div className='track-length'>
          <span className='duration'>{song.duration}</span>
        </div>
      </li>
    ));

    if (this.props.music.loading) {
      albumContent = (
        <div className='album-info-background' style={{padding: '0'}}>
          <Spinner />
        </div>
      );
    } else {
      albumContent = (
        <div className='album-info-background'>
          <div className='album-info-top'>
            <div className='left-section'>
              <img src={albumInfo.artwork} alt='album cover'/>
            </div>
            <div className='right-section'>
              <h2>{albumInfo.album}</h2>
              <p>by
                <Link to='/artist'>
                  <span onClick={() => {this.getArtist(albumInfo.artist)}}> {albumInfo.artist}</span>
                </Link>
              </p>
              <p>{tracks.length > 1 ? `${tracks.length} tracks available` : `${tracks.length} track available`}</p>
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

    return(
      <div className='album-container'>
        {this.props.currentlyPlaying.loaded !== null ? albumContent : window.location.href='/'}
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

export default connect(mapStateToProps, { loadPlaylist, getPlaylists, playSong, getArtist })(Album);
