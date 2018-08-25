import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSongs } from '../actions/songActions';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      track: 0,
      duration: 0,
      currentTime: 0,
      timeElapsed: '0:00',
      timeRemaining: null,
      muted: false
    }
  }

  componentDidMount() {
    if (this.props.playlist.loaded === false) {
      this.props.getSongs();
    }
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
    let trackCount = this.state.track;
    if (trackCount === 0) {
      trackCount = this.props.playlist.tracks.length - 1;
    } else {
      trackCount--;
    }

    this.setState({track: trackCount});
  }

  nextSong = () => {
    let trackCount = this.state.track;
    if (trackCount < this.props.playlist.tracks.length - 1) {
      trackCount++;
    } else {
      trackCount = 0;
    }

    this.setState({track: trackCount});
  }

  setShuffle = () => {
    console.log('Set Shuffle');
  }

  setRepeat = () => {
    console.log('Set Repeat');
  }

  setMute = () => {
    console.log('Set Mute');
    let muted = !this.state.muted;
    this.audio.muted = muted;
    this.setState({muted: muted});
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
    let time = this.props.playlist.tracks[this.state.track].duration.split(':');
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
    const { tracks } = this.props.playlist;
    const displayStyle =  {display: 'none'};
    let progressBarStyle = this.setProgressBar();

    return (
      <footer>
        <audio ref={(audio) => { this.audio = audio }} src={tracks.length > 0 ? tracks[this.state.track].path : null} />
        <div className="controller-bar">
          <div className="now-playing">
            <div className="content">
              <span className="album">
                <img src={tracks.length > 0 ? tracks[this.state.track].artwork : null} alt="album cover" className="album-cover" role="link" tabIndex="0"/>
              </span>
              <div className="track-info">
                <span className="track" role="link" tabIndex="0">{tracks.length > 0 ? tracks[this.state.track].title : null}</span>
                <span className="artist" role="link" tabIndex="0">{tracks.length > 0 ? tracks[this.state.track].artist : null}</span>
              </div>
            </div>
          </div>
          <div className="center-controls">
            <div className="content controls">
              <div className="buttons">
                <i className="fas fa-step-backward" title="backward" onClick={this.previousSong}></i>
                <i className="far fa-play-circle" title="play" style={!this.state.status ? null : displayStyle} onClick={this.playSong}></i>
                <i className="fas fa-pause-circle" title="pause" style={this.state.status ? null : displayStyle} onClick={this.pauseSong}></i>
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
                <span className="progress-time remaining">{this.state.timeRemaining === null ? '0:00' : this.state.timeRemaining}</span>
              </div>
            </div>
          </div>
          <div className="volume-control">
            <div className="volume-bar">
              <i className="fas fa-volume-up" title="volume" style={!this.state.muted ? null : displayStyle} onClick={this.setMute}></i>
              <i className="fas fa-volume-off" title="volume muted" style={this.state.muted ? null : displayStyle } onClick={this.setMute}></i>
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
  playlist: PropTypes.object.isRequired,
  getSongs: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  playlist: state.playlist,
  songs: state.songs.songs
});

export default connect(mapStateToProps, { getSongs })(Footer);
