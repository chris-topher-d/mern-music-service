import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { playSong } from '../actions/controlActions';
import { loadPlaylist, getPlaylists } from '../actions/playlistActions';
import { getAlbum, getArtist } from '../actions/actions';
import Spinner from './common/Spinner';
import OptionsMenu from './common/OptionsMenu';

class SearchResults extends Component {
  componentDidMount() {
    this.props.getPlaylists();
  }

  playSong = (index, content) => {
    this.props.loadPlaylist('search', content);
    this.props.playSong(index);
  }

  getAlbum = album => {
    this.props.getAlbum(album);
  }

  getArtist = artist => {
    this.props.getArtist(artist);
  }

  render() {
    const playingStyle = {background: '#f2f2f2'};
    let index, songList, artistList, albumList, searchContent;
    this.props.controls.index === null ? index = 0 : index = this.props.controls.index;

    // Filter tracks from music.search.tracks
    const tracks = this.props.music.search.tracks.filter(track => (
      track.title.toLowerCase().includes(this.props.music.search.searchTerm.toLowerCase())
    ));

    // Filter unique artist entries from music.search.tracks
    const artists = this.props.music.search.tracks.filter(track => (
      track.artist.toLowerCase().includes(this.props.music.search.searchTerm.toLowerCase())
    )).reduce((acc, next) => {
      if (acc.find(obj => obj.artist === next.artist) === undefined) {
        acc.push({artist: next.artist, tracks: [next.title], albums: [next.album]});
      } else if (acc.find(obj => obj.artist === next.artist) !== undefined) {
        if (!acc[acc.findIndex(obj => obj.artist === next.artist)].tracks.includes(next.title)) {
          acc[acc.findIndex(obj => obj.artist === next.artist)].tracks.push(next.title);
        }
        if (!acc[acc.findIndex(obj => obj.artist === next.artist)].albums.includes(next.album)) {
          acc[acc.findIndex(obj => obj.artist === next.artist)].albums.push(next.album);
        }
      }
      return acc;
    }, []);

    // Filter unique album entries from music.search.tracks
    const albums = this.props.music.search.tracks.filter(track => (
      track.album.toLowerCase().includes(this.props.music.search.searchTerm.toLowerCase())
    )).reduce((acc, next) => {
      if (acc.find(obj => obj.title === next.album) === undefined) {
        acc.push({title: next.album, artist: next.artist, artwork: next.artwork});
      }
      return acc;
    }, []);

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
            <Link to ='/artist'>
              <span className='artist-name' onClick={() => {this.getArtist(this.props.currentlyPlaying.tracks[this.props.controls.index].artist)}}>{track.artist}</span>
            </Link>
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
    } else {
      songList = <span className='no-search-results'>No song titles containing <i><strong>{this.props.music.search.searchTerm}</strong></i></span>;
    }

    if (artists.length > 0) {
      artistList = artists.map((artist, idx) => (
        <div
          key={idx}
          className='artist-result-row'
          role='link'
          tabIndex='0'
          onClick={() => {this.getArtist(artist.artist)}}
        >
          <Link to='/artist'>
            <span className='artist-info'>
              <span className='artist-name'>{artist.artist}</span>
              <p className='album-track-count'>Albums: {artist.albums.length}, Tracks: {artist.tracks.length}</p>
            </span>
          </Link>
        </div>
      ));
    } else {
      artistList = <span className='no-search-results'>No artist names containing <i><strong>{this.props.music.search.searchTerm}</strong></i></span>;
    }

    if (albums.length > 0 ) {
      albumList = albums.map((album, idx) => (
        <div key={idx} className='grid-item'>
          <Link to='/album'>
            <span role='link' tabIndex='0' onClick={() => {this.getAlbum(album.title)}}>
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
      albumList = <span className='no-search-results'>No album titles containing <i><strong>{this.props.music.search.searchTerm}</strong></i></span>;
    }

    if (this.props.music.loading) {
      searchContent = (
        <div className='search-results' style={{padding: '0'}}>
          <Spinner />
        </div>
      );
    } else {
      searchContent = (
        <div className='search-results'>
          <h2>Search Results for <i>{this.props.music.search.searchTerm}</i></h2>
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
      );
    }

    return (
      <div className='search-container'>
        {searchContent}
      </div>
    );
  }
}

SearchResults.propTypes = {
  music: PropTypes.object.isRequired,
  currentlyPlaying: PropTypes.object.isRequired,
  controls: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  music: state.music,
  currentlyPlaying: state.currentlyPlaying,
  controls: state.controls
});

export default connect(mapStateToProps, { playSong, loadPlaylist, getPlaylists, getAlbum, getArtist })(SearchResults);
