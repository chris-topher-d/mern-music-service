import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { searchFor } from '../actions/actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
  }

  handleChange = (e) => {
    this.setState({searchValue: e.target.value});
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.search(this.state.searchValue);
    }
  }

  search = item => {
    if (this.state.searchValue !== '') {
      this.props.searchFor(item);
      this.setState({searchValue: ''});
      this.props.history.push('/search');
    }
  }

  render() {
    return (
      <header>
        <nav className='nav-bar'>
          <Link to='/'>
            <div className='logo' role='link' tabIndex='0'>
              <i className='fas fa-headphones'></i>
              <h3>Songify</h3>
            </div>
          </Link>
          <span className='search'>
            <input
              type='text'
              className='search-input'
              value={this.state.searchValue}
              placeholder='Search'
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
            <i className='fas fa-search' onClick={() => {this.search(this.state.searchValue)}}></i>
          </span>
          <div className='nav-items'>
            <div className='nav-item'>
              <Link to='/'>
                <span className='nav-link' role='link' tabIndex='0'>Browse</span>
              </Link>
            </div>
            <div className='nav-item'>
              <Link to='/playlists'>
                <span className='nav-link' role='link' tabIndex='0'>Playlists</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  music: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log('test');
  return {
    music: state.music
  }
};

export default connect(mapStateToProps, { searchFor })(withRouter(Header));
