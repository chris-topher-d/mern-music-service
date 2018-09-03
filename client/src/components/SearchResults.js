import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { playSong } from '../actions/controlActions';
import { loadPlaylist } from '../actions/playlistActions';
import { getAlbum } from '../actions/actions';

class SearchResults extends Component {
  playSong = (index, content) => {
    this.props.loadPlaylist('search', content);
    this.props.playSong(index);
  }

  render() {
    const displayStyle = {display: 'none'};
    const playingStyle = {background: '#f2f2f2'};
    let index;
    this.props.controls.index === null ? index = 0 : index = this.props.controls.index;
    const results = this.props.playlists.search.tracks;

    const tracks = results.map((track, idx) => (
      <li
        key={track._id}
        className='track-list-row'
        style={this.props.currentlyPlaying.tracks[index] !== undefined && this.props.currentlyPlaying.tracks[index].title === track.title ? playingStyle : null}
      >
        <div className='track-count'>
          <i className='fas fa-play' onClick={() => {this.playSong(idx, track.title)}}></i>
          <span className='track-number'>{idx + 1}</span>
        </div>
        <div className='track-info'>
          <span className='track-name'>{track.title}</span>
          <span className='artist-name'>{track.artist}</span>
        </div>
        <div className='track-options'>
          {/* <input type='hidden' className='song-id' value=''/>
          <i className='fas fa-ellipsis-h'></i> */}
        </div>
        <div className='track-length'>
          <span className='duration'>{track.duration}</span>
        </div>
      </li>
    ));

    const albums = results.reduce((acc, next) => {
      if (acc.find(obj => obj.title === next.album) === undefined) {
        acc.push({title: next.album, artwork: next.artwork});
      }
      return acc;
    }, []);

    const albumList = albums.map((album, idx) => (
      <div key={idx} className='grid-item'>
        <Link to='/album'>
          <span role='link' tabIndex='0' onClick={() => {this.playSong()}}>
            <img src={album.artwork} alt='album cover'/>
            <div className='grid-item-info'>
              {album.title}
            </div>
          </span>
        </Link>
      </div>
    ));

    return (
      <div className='search-container'>
        <div className='search-results'>
          <div className='tracks-container'>
            <ul className='track-list'>
              <span className='track-list-title'><h2>Tracks</h2></span>
              <span className='no-results' style={this.props.playlists.search.tracks.length > 0 ? displayStyle : null}>No song titles containing <i>{this.props.playlists.search.searchTerm}</i></span>
              {tracks}
            </ul>
          </div>

          <div className='artist-results'>
            <div className='artist'>
              <h2>Artists</h2>
              <span className='no-results' style={this.props.playlists.search.tracks.length > 0 ? displayStyle : null}>No artists found for <i>{this.props.playlists.search.searchTerm}</i></span>
              <div className='artist-result-row' role='link' tabIndex='0' onClick={() => {this.playSong()}}>
                <span className='artist-info' style={this.props.playlists.search.tracks.length > 0 ? null : displayStyle}>
                  <span className='artist-name'>{this.props.playlists.search.tracks.length > 0 ? results[0].artist : null}</span>
                  <p className='album-track-count'>Albums: {albums.length}, Tracks: {tracks.length}</p>
                </span>
              </div>
            </div>
          </div>

          <div className='album-results'>
            <h2>Albums</h2>
            <span className='no-results' style={this.props.playlists.search.tracks.length > 0 ? displayStyle : null}>No album titles containing <i>{this.props.playlists.search.searchTerm}</i></span>
            <div className='albums'>
              {albumList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchResults.propTypes = {
  playlists: PropTypes.object.isRequired,
  currentlyPlaying: PropTypes.object.isRequired,
  controls: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  playlists: state.playlists,
  currentlyPlaying: state.currentlyPlaying,
  controls: state.controls
});

export default connect(mapStateToProps, { playSong, loadPlaylist, getAlbum })(SearchResults);
