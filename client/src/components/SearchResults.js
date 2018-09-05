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

  getAlbum = () => {

  }

  render() {
    const displayStyle = {display: 'none'};
    const playingStyle = {background: '#f2f2f2'};
    let index, songList, artistList, albumList;
    this.props.controls.index === null ? index = 0 : index = this.props.controls.index;
    const results = this.props.playlists.search.tracks;

    const tracks = this.props.playlists.search.tracks.filter(track => (
      track.title.toLowerCase().includes(this.props.playlists.search.searchTerm.toLowerCase())
    ));

    const artists = this.props.playlists.search.tracks.filter(track => (
      track.artist.toLowerCase().includes(this.props.playlists.search.searchTerm.toLowerCase())
    )).reduce((acc, next) => {
      if (!acc.includes(next.artist)) acc.push(next);
      return acc;
    }, []);

    const albums = this.props.playlists.search.tracks.filter(track => (
      track.album.toLowerCase().includes(this.props.playlists.search.searchTerm.toLowerCase())
    )).reduce((acc, next) => {
      if (acc.find(obj => obj.title === next.album) === undefined) {
        acc.push({title: next.album, artist: next.artist, artwork: next.artwork});
      }
      return acc;
    }, []);

    // console.log(albums);

    if (tracks.length > 0) {
      songList = tracks.map((track, idx) => (
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
    } else {
      songList = <span className='no-search-results'>No song titles containing <i><strong>{this.props.playlists.search.searchTerm}</strong></i></span>;
    }

    if (artists.length > 0) {
      artistList = artists.map((artist, idx) => (
        <div key={idx} className='artist-result-row' role='link' tabIndex='0' onClick={() => {this.playSong()}}>
          <span className='artist-info' style={this.props.playlists.search.tracks.length > 0 ? null : displayStyle}>
            <span className='artist-name'>{artist.artist}</span>
          </span>
        </div>
      ));
    } else {
      artistList = <span className='no-search-results'>No artist names containing <i><strong>{this.props.playlists.search.searchTerm}</strong></i></span>;
    }

    if (albums.length > 0 ) {
      albumList = albums.map((album, idx) => (
        <div key={idx} className='grid-item'>
          <Link to='/album'>
            <span role='link' tabIndex='0' onClick={() => {this.getAlbum()}}>
              <img src={album.artwork} alt='album cover'/>
              <div className='grid-item-info'>
                <p className='album-title'>{album.title}</p>
                <p className='album-artist'>{album.artist}</p>
              </div>
            </span>
          </Link>
        </div>
      ));
    } else {
      albumList = <span className='no-search-results'>No album titles containing <i><strong>{this.props.playlists.search.searchTerm}</strong></i></span>;
    }

    return (
      <div className='search-container'>
        <div className='search-results'>
          <h2>Search Results for <i>{this.props.playlists.search.searchTerm}</i></h2>
          <div className='tracks-container'>
            <ul className='track-list'>
              <span className='track-list-title'><h2>Tracks</h2></span>
              {songList}
            </ul>
          </div>

          <div className='artist-results'>
            <div className='artist'>
              <h2>Artists</h2>
              {artistList}
            </div>
          </div>

          <div className='album-results'>
            <h2>Albums</h2>
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
