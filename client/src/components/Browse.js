import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getSongs, getAlbum, getArtist } from '../actions/actions';
import { loadPlaylist, getPlaylists } from '../actions/playlistActions';
import { playSong } from '../actions/controlActions';
import Spinner from './common/Spinner';
import OptionsMenu from './common/OptionsMenu';

class Browse extends Component {
  componentWillMount() {
    this.props.getSongs();
    this.props.getPlaylists();
  }

  onClick = (songId, album, artist, artwork) => {
    this.props.getAlbum(album, artist, artwork);
  }

  play = (index, content) => {
    this.props.loadPlaylist('browse', content);
    this.props.playSong(index);
  }

  getAlbum = album => {
    this.props.getAlbum(album);
  }

  getArtist = artist => {
    this.props.getArtist(artist);
  }

  render() {
    const { tracks } = this.props.music.songs;
    const playingStyle = {background: '#f2f2f2'};
    let index, browseContent;
    this.props.controls.index === 0 ? index = 0 : index = this.props.controls.index;

    const trackList = tracks.map((track, idx) => (
      <div className='song-details' key={track._id}>
        <Link to='album'>
          <div className='album-cover' onClick={() => {this.getAlbum(track.album)}}>
            <img src={track.artwork} alt='Album Cover'/>
          </div>
        </Link>
        <div
          className='track-list-row'
          style={this.props.currentlyPlaying.tracks[index] !== undefined && this.props.currentlyPlaying.tracks[index].title === track.title ? playingStyle : null}
        >
          <div className='track-info-left'>
            <div className='play-circle' onClick={() => {this.play(idx, 'browse')}}>
              <i className='fas fa-play'></i>
            </div>
            <div className='track-details'>
              <Link to='/album'>
                <span className='track-name' onClick={() => {this.getAlbum(track.album)}}>{track.title}</span>
              </Link>
              <Link to='/artist'>
                <span className='artist-name' onClick={() => {this.getArtist(track.artist)}}>{track.artist}</span>
              </Link>
            </div>
          </div>
          <div className='track-info-right'>
            <div className='track-options'>
              <i className='fas fa-ellipsis-h'></i>
              <OptionsMenu songId={track._id} />
            </div>
            <div className='track-length'>
              <span className='duration'>{track.duration}</span>
            </div>
          </div>
        </div>
      </div>
    ));

    if (this.props.music.loading) {
      browseContent = (
        <div className='browse-songs' style={{padding: '0'}}>
          <Spinner />
        </div>
      );
    } else {
      browseContent = (
        <div className='browse-songs'>
          <h2>Recommended for you</h2>
          {trackList}
        </div>
      );
    }

    return (
      <div className='browse-container'>
        {browseContent}
      </div>
    );
  }
}

Browse.propTypes = {
  music: PropTypes.object.isRequired,
  currentlyPlaying: PropTypes.object.isRequired,
  controls: PropTypes.object.isRequired,
  getSongs: PropTypes.func.isRequired,
  getAlbum: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  music: state.music,
  currentlyPlaying: state.currentlyPlaying,
  controls: state.controls
});

export default connect(mapStateToProps, { getSongs, loadPlaylist, playSong, getPlaylists, getAlbum, getArtist })(Browse);
