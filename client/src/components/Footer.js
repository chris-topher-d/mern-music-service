import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateIndex, setPlay } from '../actions/controlActions';
import { getArtist, getAlbum } from '../actions/actions';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      trackId: 0,
      playing: false,
      track: 0,
      currentTime: 0,
      timeRemaining: null,
      songDuration: '',
      shuffle: false,
      repeat: false,
      muted: false
    }
  }

  componentDidUpdate() {
    // Update progress bar when searching through song
    this.setProgressBar();
    if (this.props.controls.play && !this.state.playing) this.playSong();
  }

  componentWillReceiveProps(newProps) {
    if (this.state.content !== newProps.currentlyPlaying.loaded || this.state.trackId !== newProps.currentlyPlaying.tracks[newProps.controls.index]._id) {
      this.audio.currentTime = 0;
      this.setProgressBar();
      let duration = this.getSeconds(newProps.currentlyPlaying.tracks[newProps.controls.index].duration);
      this.setState({
        content: newProps.currentlyPlaying.loaded,
        trackId: newProps.currentlyPlaying.tracks[newProps.controls.index]._id,
        songDuration: duration,
        timeRemaining: newProps.currentlyPlaying.tracks[newProps.controls.index].duration
      });
    }
  }

  // Set timer to update every second while music is playing
  setTimer = (time) => {
    let currentTime = time;

    this.timer = setInterval(() => {
        if (Math.floor(this.audio.currentTime) === Math.floor(this.audio.duration)) this.nextSong();
        currentTime++;
        this.setState({
          currentTime: currentTime,
          timeRemaining: this.formatTime(this.audio.duration - this.audio.currentTime)
        });
    }, 1000);
  }

  // Play button
  playSong = () => {
    // clearInterval(this.timer);
    this.setTimer(this.state.currentTime);
    this.setState({
      playing: true,
      timeRemaining: this.formatTime(this.audio.duration - this.audio.currentTime)
    });
    if (!this.props.controls.play) {
      this.props.setPlay(true);
      this.audio.play();
    }
  }

  // Pause button
  pauseSong = () => {
    this.setState({playing: false});
    clearInterval(this.timer);
    this.props.setPlay(false);
    this.audio.pause();
  }

  // Back button
  previousSong = () => {
    clearInterval(this.timer);
    // this.audio.currentTime = 0;

    // If the song has been playing for 5 seconds or more, restart the song
    if (this.audio.currentTime > 4) {
      this.setState({
        currentTime: 0,
        timeRemaining: this.formatTime(this.audio.duration - this.audio.currentTime)
      });
      this.audio.currentTime = 0;

      // If music was already playing, continue to play
      if (this.props.controls.play) this.setTimer();

    // If song has been playing for less than 5 seconds, play previous song
    } else {
      let trackCount = this.props.controls.index;

      trackCount === 0 ? trackCount = this.props.currentlyPlaying.tracks.length - 1 : trackCount--;

      this.props.updateIndex(trackCount);
      this.audio.currentTime = 0;

      this.setState({
        track: trackCount,
        currentTime: 0,
        timeRemaining: this.formatTime(this.audio.duration - this.audio.currentTime)
      });

      // If music was already playing, continue to play
      if (this.props.controls.play) this.setTimer();
    }
  }

  // Forward button
  nextSong = () => {
    clearInterval(this.timer);
    this.audio.currentTime = 0;

    let trackCount = this.props.controls.index;
    trackCount < this.props.currentlyPlaying.tracks.length - 1 ? trackCount++ : trackCount = 0;

    this.props.updateIndex(trackCount);

    this.setState({
      track: trackCount,
      currentTime: 0,
      timeRemaining: this.props.currentlyPlaying.tracks[this.props.controls.index].duration
    });

    this.setProgressBar();

    // If state.currentPlaylist only contains 1 song
    // because trackCount won't change and update (below)
    if (this.props.controls.play) {
      this.playSong();
    }
  }

  // Shuffle button
  setShuffle = () => {
    // console.log('Set Shuffle');
    let shuffleState = this.state.shuffle;
    this.setState({shuffle: !shuffleState});
  }

  // Repeat buton
  setRepeat = () => {
    // console.log('Set Repeat');
    let repeatState = this.state.repeat;
    this.setState({repeat: !repeatState});
  }

  // Mute
  setMute = () => {
    let muted = !this.state.muted;
    this.audio.muted = muted;
    this.setState({muted: muted});
  }

  getSeconds = (songDuration) => {
    let time = songDuration.split(':');
    let minutes = Number(time[0]);
    let seconds = Number(time[1]);
    return (minutes * 60) + seconds;
  }

  formatTime = (songDuration) => {
    let time = Math.round(songDuration);
    let minutes = Math.floor(time / 60);
    let seconds = time - (minutes * 60);
    let zero = seconds < 10 ? '0' : '';
    return `${minutes}:${zero}${seconds}`;
  }

  findPoint = (e) => {
    let offset = e.nativeEvent.offsetX;
    let progressBarWidth = this.trackLength.clientWidth;
    let percentageOfSong = offset / progressBarWidth;
    let newCurrentTime = Math.floor(this.audio.duration * percentageOfSong);

    this.setState({currentTime: newCurrentTime});
    this.audio.currentTime = newCurrentTime;
    this.setProgressBar();
  }

  setProgressBar = (position) => {
    this.progressBar.style.width = `${(this.audio.currentTime / this.audio.duration) * 100}%`;
  }

  setVolume = (e) => {
    console.log(e.target.clientY);
    let offset, percent;
    if (e.nativeEvent.offsetY < 165 && e.nativeEvent.offsetY > 13) {
      offset = this.volumeBar.clientHeight - e.nativeEvent.offsetY + 14;
      percent = (offset / this.volumeBar.clientHeight) * 100;
    } else if (e.nativeEvent.offsetY < 14) {
      percent = 100;
    } else if (e.nativeEvent.offsetY > 164) {
      percent = 0;
    }
    this.audio.volume = percent / 100;
    this.currentVolume.style.height = `${percent}%`;
  }

  getArtist = artist => {
    this.props.getArtist(artist);
  }

  getAlbum = album => {
    this.props.getAlbum(album);
  }

  render() {
    const displayStyle = {display: 'none'};
    const activeStyle = {color: 'orange'};
    let timeElapsed, timeRemaining;
    if (this.props.currentlyPlaying.loaded) {
      timeElapsed = this.formatTime(this.audio.currentTime);
      timeRemaining = this.formatTime(this.state.songDuration - this.audio.currentTime);
    }

    return (
      <footer>
        <audio
          ref={(audio) => { this.audio = audio }}
          src={this.props.currentlyPlaying.tracks.length > 0 ? this.props.currentlyPlaying.tracks[this.props.controls.index].path : null}
          autoPlay={this.state.playing}
        />
        <div className='controller-bar'>
          <div className='now-playing'>
            <div className='content'>
              <span className='album'>
                <img
                  src={this.props.currentlyPlaying.tracks.length > 0 ? this.props.currentlyPlaying.tracks[this.props.controls.index].artwork : null}
                  alt='album cover'
                  className='album-cover'
                   role='link'
                   tabIndex='0'
                 />
              </span>
              <div className='track-info'>
                <Link to ='/album'>
                  <span
                    className='track'
                    role='link'
                    tabIndex='0'
                    onClick={() => {this.getAlbum(this.props.currentlyPlaying.tracks[this.props.controls.index].album)}}
                  >
                    {this.props.currentlyPlaying.tracks.length > 0 ? this.props.currentlyPlaying.tracks[this.props.controls.index].title : null}
                  </span>
                </Link>
                <Link to='/artist'>
                  <span
                    className='artist'
                    role='link'
                    tabIndex='0'
                    onClick={() => {this.getArtist(this.props.currentlyPlaying.tracks[this.props.controls.index].artist)}}
                  >
                    {this.props.currentlyPlaying.tracks.length > 0 ? this.props.currentlyPlaying.tracks[this.props.controls.index].artist : null}
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className='control-buttons'>
            <i className='fas fa-step-backward' title='backward' onClick={this.previousSong}></i>
            <i className='fas fa-play' title='play' style={!this.state.playing ? null : displayStyle} onClick={this.playSong}></i>
            <i className='fa fa-pause' title='pause' style={this.state.playing ? null : displayStyle} onClick={this.pauseSong}></i>
            <i className='fas fa-step-forward' title='forward' onClick={this.nextSong}></i>
            <i className='fas fa-random' title='shuffle' style={this.state.shuffle ? activeStyle : null} onClick={this.setShuffle}></i>
            <i className='fas fa-redo-alt' title='repeat' style={this.state.repeat ? activeStyle : null} onClick={this.setRepeat}></i>
          </div>
          <div className='playback-bar'>
            <span className='progress-time current'>{timeElapsed}</span>
            <div
              className='progress-bar'
              onClick={this.findPoint}
              ref={ trackLength => {this.trackLength = trackLength}}
            >
              <div className='progress-bar-bg'>
                <div className='progress' ref={ progressBar => {this.progressBar = progressBar}}></div>
              </div>
            </div>
            <span className='progress-time remaining'>
              {this.state.timeRemaining === null ? '0:00' : timeRemaining}
            </span>
          </div>
          <div className='volume-control'>
            <div className='volume-bar'>
              <i className='fas fa-volume-up' title='volume' style={!this.state.muted ? null : displayStyle} onClick={this.setMute}></i>
              <i className='fas fa-volume-off' title='volume muted' style={this.state.muted ? null : displayStyle } onClick={this.setMute}></i>
              <div
                className='volume-progress-bar'
                // onClick={() => {this.setVolume()}}
                onClick={this.setVolume}
                // ref={ volumeBar => {this.volumeBar = volumeBar}}
              >
                <div
                  className='volume-progress-bar-bg'
                  // onClick={this.setVolume}
                  ref={ volumeBar => {this.volumeBar = volumeBar}}
                >
                  <div
                    className='volume-progress'
                    style={{height: '100%'}}
                    ref={ currentVolume => {this.currentVolume = currentVolume}}
                  ></div>
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
  playlists: PropTypes.object.isRequired,
  currentlyPlaying: PropTypes.object.isRequired,
  controls: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  playlists: state.playlists,
  currentlyPlaying: state.currentlyPlaying,
  controls: state.controls
});

export default connect(mapStateToProps, { getArtist, getAlbum, updateIndex, setPlay })(Footer);
