import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Album extends Component {
  playSong = () => {

  }

  render() {
    const { album, songs } = this.props.album;
    console.log(album, songs);

    return(
      <div>
        <div className='album-info-top'>
          <div className='left-section'>
            <img src='' alt='album cover'/>
          </div>
          <div className='right-section'>
            <h2>Title Goes Here</h2>
            <p>by Artist Name</p>
            <p>X tracks available</p>
          </div>
        </div>
        <div className='tracks-container'>
          <ul className='track-list'>
            <li className='track-list-row'>
              <div className='track-count'>
                <i className='fas fa-play' onClick={this.playSong}></i>
                <span className='track-number'>Album Track Number</span>
              </div>
              <div className='track-info'>
                <span className='track-name'>Track Title</span>
                <span className='artist-name'>Artist Name</span>
              </div>
              {/* <div className='track-options'>
                <input type='hidden' className='song-id' value='{$song->getId()}'/>
                <i className='fas fa-ellipsis-h' onClick='showOptionsMenu(this)'></i>
              </div> */}
              <div className='track-length'>
                <span className='duration'>Song Duration</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  album: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  album: state.album
});

export default connect(mapStateToProps)(Album);
