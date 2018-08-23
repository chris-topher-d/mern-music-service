import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false
    }
  }

  previousSong = () => {

  }

  playSong = () => {
    // let status = this.state.status;
    this.setState({status: true});
    this.audio.play();
  }

  pauseSong = () => {
    this.setState({status: false});
    this.audio.pause();
  }

  nextSong = () => {

  }

  setShuffle = () => {

  }

  setRepeat = () => {

  }

  setMute = () => {

  }

  timeElapsed = (time) => {

  }

  timeRemaining = (time) => {

  }

  render() {
    const { song } = this.props;
    const playStyle =  {display: 'none'};

    return (
      <footer>
        <audio ref={(audio) => { this.audio = audio }} src={song.path} />
        <div className="controller-bar">
          <div className="now-playing">
            <div className="content">
              <span className="album">
                <img src={song.artwork} alt="album cover" className="album-cover" role="link" tabIndex="0"/>
              </span>
              <div className="track-info">
                <span className="track" role="link" tabIndex="0">{song.title}</span>
                <span className="artist" role="link" tabIndex="0">{song.artist}</span>
              </div>
            </div>
          </div>
          <div className="center-controls">
            <div className="content controls">
              <div className="buttons">
                <i className="fas fa-step-backward" title="backward" onClick={this.previousSong}></i>
                <i className="far fa-play-circle" title="play" style={!this.state.status ? null : playStyle} onClick={this.playSong}></i>
                <i className="fas fa-pause-circle" title="pause" style={this.state.status ? null : playStyle} onClick={this.pauseSong}></i>
                <i className="fas fa-step-forward" title="forward" onClick={this.nextSong}></i>
                <i className="fas fa-random" title="shuffle" onClick={this.setShuffle}></i>
                <i className="fas fa-redo-alt" title="repeat" onClick={this.setRepeat}></i>
              </div>
              <div className="playback-bar">
                <span className="progress-time current">0:00</span>
                <div className="progress-bar">
                  <div className="progress-bar-bg">
                    <div className="progress"></div>
                  </div>
                </div>
                <span className="progress-time remaining">{song.duration}</span>
              </div>
            </div>
          </div>
          <div className="volume-control">
            <div className="volume-bar">
              <i className="fas fa-volume-up" title="volume" onClick={this.setMute}></i>
              <i className="fas fa-volume-off" title="volume muted" style={{display: 'none'}} onClick={this.setMute}></i>
              <div className="progress-bar">
                <div className="progress-bar-bg">
                  <div className="progress"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  song: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  song: state.songs.song
});

export default connect(mapStateToProps)(Footer);
