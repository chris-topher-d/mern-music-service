import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      this.search();
    }
  }

  search = () => {
    this.setState({searchValue: ''});
  }

  render() {
    return (
      <header>
        <nav className="nav-bar">
          <Link to='/'>
            <div className="logo" role="link" tabIndex="0">
              <i className="fas fa-headphones"></i>
              <h3>Songify</h3>
            </div>
          </Link>
          <div className="search">
            <span className="search-container">
              <input
                type="text"
                className="search-input"
                value={this.state.searchValue}
                placeholder="Search"
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
              />
              <i className="fas fa-search" onClick={this.search}></i>
            </span>
          </div>
          <div className="nav-items">
            <div className="nav-item">
              <Link to='/'>
                <span className="nav-link" role="link" tabIndex="0">Browse</span>
              </Link>
            </div>
            <div className="nav-item">
              <span className="nav-link" role="link" tabIndex="0">Your Music</span>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
