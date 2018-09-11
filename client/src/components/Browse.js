import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getSongs, getAlbum, getArtist } from '../actions/actions';
import { getPlaylists } from '../actions/playlistActions';
import OptionsMenu from './common/OptionsMenu';

class Browse extends Component {
  componentWillMount() {
    this.props.getSongs();
    this.props.getPlaylists();
  }

  onClick = (songId, album, artist, artwork) => {
    this.props.getAlbum(album, artist, artwork);
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
    let index, artistContent;
    this.props.controls.index === 0 ? index = 0 : index = this.props.controls.index;

    const trackList = tracks.map((track, idx) => (
      <div className='song-details' key={track._id}>
        <Link to='album'>
          <div className='album-cover' onClick={() => {this.getAlbum(track.album)}}>
            <img src={track.artwork} />
          </div>
        </Link>
        <div
          className='track-list-row'
          // style={this.props.currentlyPlaying.tracks[index] !== undefined && this.props.currentlyPlaying.tracks[index].title === track.title ? playingStyle : null}
        >
          <div className='track-info-left'>
            <div className='play-circle'>
              <i className='fas fa-play' onClick={() => {this.play(idx, track.artist)}}></i>
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

    return (
      <div className='browse-container'>
        <div className='browse-songs'>
          <h2>Recommended for you</h2>
          {trackList}
        </div>
      </div>
    );
  }
}

Browse.propTypes = {
  music: PropTypes.object.isRequired,
  controls: PropTypes.object.isRequired,
  getSongs: PropTypes.func.isRequired,
  getAlbum: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  music: state.music,
  controls: state.controls
});

export default connect(mapStateToProps, { getSongs, getPlaylists, getAlbum, getArtist })(Browse);
