import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateIndex, setPlay, shufflePlayOrder } from '../actions/controlActions';
import { getArtist, getAlbum } from '../actions/actions';
import defaultArtwork from '../images/playlist-record.jpg';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      trackId: 0,
      playing: false,
      currentTime: 0,
      timeRemaining: null,
      songDuration: '',
      repeat: false,
      muted: false
    }
  }

  componentDidUpdate() {
    // Update progress bar when searching through song
    this.setProgressBar();
    // When a song is played from a new this.props.music source while state.playing is false
    if (this.props.controls.play && !this.state.playing) this.playSong();
  }

  componentWillReceiveProps(newProps) {
    if (this.state.content !== newProps.currentlyPlaying.loaded || this.state.trackId !== newProps.currentlyPlaying.tracks[newProps.controls.index]._id) {
      this.audio.currentTime = 0;
      this.setProgressBar();
      if (newProps.currentlyPlaying.tracks.length > 0) {
        let duration = this.getSeconds(newProps.currentlyPlaying.tracks[newProps.controls.index].duration);
        this.setState({
          content: newProps.currentlyPlaying.loaded,
          trackId: newProps.currentlyPlaying.tracks[newProps.controls.index]._id,
          songDuration: duration,
          timeRemaining: newProps.currentlyPlaying.tracks[newProps.controls.index].duration
        });
      }
    }
  }

  // Set timer to update every second while music is playing
  setTimer = (time) => {
    let currentTime = time;

    this.timer = setInterval(() => {
        if (Math.floor(this.audio.currentTime) >= Math.floor(this.audio.duration)) this.nextSong();
        currentTime++;
        this.setState({
          currentTime: currentTime,
          timeRemaining: this.formatTime(this.audio.duration - this.audio.currentTime)
        });
    }, 1000);
  }

  // Play button
  playSong = () => {
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
    clearInterval(this.timer);
    this.setState({playing: false});
    this.props.setPlay(false);
    this.audio.pause();
  }

  // Back button
  previousSong = () => {
    clearInterval(this.timer);

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

      // If REPEAT is activated
      if (this.state.repeat) {
        trackCount = this.props.controls.index;
        this.props.updateIndex(trackCount);
      }

      // If SHUFFLE is activated
      if (this.props.controls.shuffle && !this.state.repeat) {
        if (this.props.controls.shuffledOrder.indexOf(this.props.controls.index) === 0) {
          trackCount = this.props.currentlyPlaying.tracks.length - 1;
        } else {
          trackCount = this.props.controls.shuffledOrder.indexOf(this.props.controls.index) - 1;
        }
        this.props.updateIndex(this.props.controls.shuffledOrder[trackCount]);
      }

      // NO SHUFFLE or REPEAT
      if (!this.props.controls.shuffle && !this.state.repeat){
        trackCount > 0 ? trackCount-- : trackCount = this.props.currentlyPlaying.tracks.length - 1;
        this.props.updateIndex(trackCount);
      }

      this.audio.currentTime = 0;

      this.setState({
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

    // If REPEAT is activated
    if (this.state.repeat) {
      trackCount = this.props.controls.index;
      this.props.updateIndex(trackCount);
    }

    // If SHUFFLE is activated
    if (this.props.controls.shuffle && !this.state.repeat) {
      if (this.props.controls.shuffledOrder.indexOf(this.props.controls.index) === this.props.currentlyPlaying.tracks.length - 1) {
        trackCount = 0;
      } else {
        trackCount = this.props.controls.shuffledOrder.indexOf(this.props.controls.index) + 1;
      }
      this.props.updateIndex(this.props.controls.shuffledOrder[trackCount]);
    }

    // NO SHUFFLE or REPEAT
    if (!this.props.controls.shuffle && !this.state.repeat){
      trackCount < this.props.currentlyPlaying.tracks.length - 1 ? trackCount++ : trackCount = 0;
      this.props.updateIndex(trackCount);
    }

    this.setState({
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
    let shuffledOrder = [];
    while (shuffledOrder.length !== this.props.currentlyPlaying.tracks.length) {
      let index = Math.floor(this.props.currentlyPlaying.tracks.length * Math.random());
      if (!shuffledOrder.includes(index)) shuffledOrder.push(index);
    }
    this.props.shufflePlayOrder(shuffledOrder);
  }

  // Repeat buton
  setRepeat = () => {
    let repeatState = this.state.repeat;
    this.setState({repeat: !repeatState});
  }

  // Mute
  setMute = () => {
    let muted = !this.state.muted;
    this.audio.muted = muted;
    this.setState({muted: muted});

    if (muted) this.currentVolume.style.height = '0%';
    if (!muted) this.currentVolume.style.height = `${this.audio.volume * 100}%`;
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
    let offset = window.innerHeight - e.clientY - 50;
    let percent = 0;
    if (offset < 166 && offset > 14) {
      offset = offset - 15;
      percent = (offset / this.volumeBar.clientHeight) * 100;
    } else if (offset < 15) {
      percent = 0;
    } else if (offset > 165) {
      percent = 100;
    }
    this.audio.volume = percent / 100;
    this.currentVolume.style.height = `${percent}%`;

    // If volume is currently muted, unmute
    if (this.state.muted) this.setMute();
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
    let timeElapsed = '0:00';
    let timeRemaining;
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
              <Link to='/album'>
                <img
                  src={this.props.currentlyPlaying.tracks.length > 0 ? this.props.currentlyPlaying.tracks[this.props.controls.index].artwork : defaultArtwork}
                  alt='album cover'
                  className='album-cover'
                  role='link'
                  tabIndex='0'
                  onClick={() => {this.getAlbum(this.props.currentlyPlaying.tracks[this.props.controls.index].album)}}
                 />
               </Link>
              <div className='track-info'>
                <Link to ='/album'>
                  <span
                    className='track'
                    role='link'
                    tabIndex='0'
                    onClick={() => {this.getAlbum(this.props.currentlyPlaying.tracks[this.props.controls.index].album)}}
                  >
                    {this.props.currentlyPlaying.tracks.length > 0 ? this.props.currentlyPlaying.tracks[this.props.controls.index].title : 'Songify'}
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
            <i
              className='fas fa-step-backward'
              title='backward'
              onClick={this.props.currentlyPlaying.loaded !== null ? this.previousSong : null}
            ></i>
            <i
              className='fas fa-play'
              title='play'
              style={!this.state.playing ? null : displayStyle}
              onClick={this.props.currentlyPlaying.loaded !== null ? this.playSong : null}
            ></i>
            <i
              className='fa fa-pause'
              title='pause'
              style={this.state.playing ? null : displayStyle}
              onClick={this.pauseSong}
            ></i>
            <i
              className='fas fa-step-forward'
              title='forward'
              onClick={this.props.currentlyPlaying.loaded !== null ? this.nextSong : null}
            ></i>
            <i
              className='fas fa-random'
              title='shuffle'
              style={this.props.controls.shuffle ? activeStyle : null}
              onClick={this.props.currentlyPlaying.loaded !== null ? this.setShuffle : null}
            ></i>
            <i
              className='fas fa-redo-alt'
              title='repeat'
              style={this.state.repeat ? activeStyle : null}
              onClick={this.props.currentlyPlaying.loaded !== null ? this.setRepeat : null}
            ></i>
          </div>
          <div className='playback-bar'>
            <span className='progress-time current'>{timeElapsed}</span>
            <div
              className='progress-bar'
              onClick={this.props.currentlyPlaying.loaded !== null ? this.findPoint : null}
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
              <i
                className='fas fa-volume-up'
                title='volume'
                style={!this.state.muted ? null : displayStyle}
                onClick={this.setMute}
              ></i>
              <i
                className='fas fa-volume-off'
                title='volume muted'
                style={this.state.muted ? null : displayStyle }
                onClick={this.setMute}
              ></i>
              <div className='volume-progress-bar' onClick={this.setVolume}>
                <div className='volume-progress-bar-bg' ref={ volumeBar => {this.volumeBar = volumeBar}}>
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
  music: PropTypes.object.isRequired,
  currentlyPlaying: PropTypes.object.isRequired,
  controls: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  music: state.music,
  currentlyPlaying: state.currentlyPlaying,
  controls: state.controls
});

export default connect(mapStateToProps, { getArtist, getAlbum, updateIndex, setPlay, shufflePlayOrder })(Footer);
