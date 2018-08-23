import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSong } from '../actions/songActions';

class Album extends Component {
  playSong = (songId) => {
    this.props.getSong(songId)
  }

  showMenu = () => {

  }

  render() {
    const { albumInfo, songs } = this.props.album;
    console.log(albumInfo, songs);

    const tracks = songs.map((song, idx) => (
      <li className='track-list-row' key={song._id}>
        <div className='track-count'>
          <i className='fas fa-play' onClick={() => {this.playSong(song._id)}}></i>
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
            <p>{songs.length} tracks available</p>
          </div>
        </div>
        <div className='tracks-container'>
          <ul className='track-list'>
            {tracks}
          </ul>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  album: PropTypes.object.isRequired,
  getSong: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  album: state.album
});

export default connect(mapStateToProps, { getSong })(Album);
