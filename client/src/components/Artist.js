import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { loadPlaylist } from '../actions/playlistActions';
import { playSong } from '../actions/controlActions';
import { getAlbum } from '../actions/actions';
import OptionsMenu from './common/OptionsMenu';

class Artist extends Component {

  play = (index, content) => {
    this.props.loadPlaylist('artist', content);
    this.props.playSong(index);
  }

  getAlbum = album => {
    this.props.getAlbum(album);
  }

  render() {
    const { tracks } = this.props.music.artist;
    const albums = this.props.music.artist.tracks.reduce((acc, next) => {
      if (acc.find(obj => obj.title === next.album) === undefined) {
        acc.push({title: next.album, artwork: next.artwork});
      }
      return acc;
    }, []);

    const playingStyle = {background: '#f2f2f2'};
    let index;
    this.props.controls.index === 0 ? index = 0 : index = this.props.controls.index;

    const albumList = albums.map((album, idx) => (
      <div key={idx} className='grid-item'>
        <Link to='/album'>
          <span role='link' tabIndex='0' onClick={() => {this.getAlbum(album.title)}}>
            <img src={album.artwork} alt='album cover'/>
            <div className='grid-item-info'>
              {album.title}
            </div>
          </span>
        </Link>
      </div>
    ));

    const trackList = tracks.map((track, idx) => (
      <li
        key={track._id}
        className='track-list-row'
        style={this.props.currentlyPlaying.tracks[index] !== undefined && this.props.currentlyPlaying.tracks[index].title === track.title ? playingStyle : null}
      >
        <div className='track-count'>
          <i className='fas fa-play' onClick={() => {this.play(idx, track.artist)}}></i>
          <span className='track-number'>{idx + 1}</span>
        </div>
        <div className='track-info'>
          <span className='track-name'>{track.title}</span>
          <span className='album-name'>{track.album}</span>
        </div>
        <div className='track-options'>
          <i className='fas fa-ellipsis-h'></i>
          <OptionsMenu songId={track._id} />
        </div>
        <div className='track-length'>
          <span className='duration'>{track.duration}</span>
        </div>
      </li>
    ));

    return (
      <div className='artist-container'>
        <div className='artist-info'>
          <div className='artist-header'>
            <h1 className='name'>{this.props.music.artist.tracks.length > 0 ? tracks[0].artist : null}</h1>
            <div className='header-buttons'>
              <button className='button' onClick={this.playSong}>PLAY</button>
            </div>
          </div>
          <div className='center-container'>
            <div className='artist-albums'>
              <h2 className='artist-albums-title'>Albums</h2>
              {albumList}
            </div>

            <div className='tracks-container'>
              <ul className='track-list'>
                <h2>Tracks</h2>
                {trackList}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Artist.propTypes = {
  music: PropTypes.object.isRequired,
  currentlyPlaying: PropTypes.object.isRequired,
  controls: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  music: state.music,
  currentlyPlaying: state.currentlyPlaying,
  controls: state.controls
});

export default connect(mapStateToProps, { loadPlaylist, playSong, getAlbum })(Artist);
