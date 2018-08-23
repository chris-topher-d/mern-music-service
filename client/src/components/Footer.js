import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      duration: 0,
      currentTime: 0,
      timeElapsed: '0:00',
      timeRemaining: null
    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(newProps) {
    clearInterval(this.timer);

    this.setState({
      status: false,
      duration: 0,
      currentTime: 0,
      timeElapsed: '0:00',
      timeRemaining: null
    });

    // this.setProgressBar();
  }

  playSong = () => {
    this.setState({status: true});
    this.getSeconds()

    let currentTime = this.state.currentTime;

    this.timer = setInterval(() => {
        currentTime++;
        this.setState({currentTime: currentTime})
        this.timeElapsed();
        this.timeRemaining();
    }, 1000);

    this.audio.play();
  }

  pauseSong = () => {
    this.setState({status: false});
    clearInterval(this.timer);
    this.audio.pause();
  }

  previousSong = () => {
    console.log('Previous Song');
  }

  nextSong = () => {
    console.log('Next Song');
  }

  setShuffle = () => {
    console.log('Set Shuffle');
  }

  setRepeat = () => {
    console.log('Set Repeat');
  }

  setMute = () => {
    console.log('Set Mute');
  }

  timeElapsed = () => {
    let timeElapsed = this.formatTime(this.state.currentTime);
    this.setState({timeElapsed: timeElapsed});
  }

  timeRemaining = () => {
    let timeRemaining = this.formatTime(this.state.duration - this.state.currentTime);
    this.setState({timeRemaining: timeRemaining});
  }

  getSeconds = (duration) => {
    let time = this.props.song.duration.split(':');
    let minutes = Number(time[0]);
    let seconds = Number(time[1]);
    let totalSeconds = (minutes * 60) + seconds;
    this.setState({duration: totalSeconds});
  }

  formatTime = (duration) => {
    // let time = Math.round(seconds);
    let minutes = Math.floor(duration / 60);
    let seconds = duration - (minutes * 60);
    let zero = seconds < 10 ? '0' : '';
    return `${minutes}:${zero}${seconds}`;
  }

  setProgressBar = () => {
    let percentage = (this.state.currentTime / this.state.duration) * 100;
    return {width: `${percentage}%`};
  }

  render() {
    const { song } = this.props;
    const playStyle =  {display: 'none'};
    let progressBarStyle = this.setProgressBar();

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
                <span className="progress-time current">{this.state.timeElapsed}</span>
                <div className="progress-bar">
                  <div className="progress-bar-bg">
                    <div className="progress" style={progressBarStyle}></div>
                  </div>
                </div>
                <span className="progress-time remaining">{this.state.timeRemaining === null ? this.props.song.duration : this.state.timeRemaining}</span>
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
