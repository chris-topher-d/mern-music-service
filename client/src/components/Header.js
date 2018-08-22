import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
  }

  render() {
    return (
      <header>
        <nav className="nav-bar">
          <div className="logo" role="link" tabIndex="0">
            <i className="fas fa-headphones"></i>
            <h3>Songify</h3>
          </div>
          <div className="search">
            <span className="search-container">
              <input type="text" className="search-input" value={this.state.searchValue} placeholder="Search"/>
              <i className="fas fa-search"></i>
            </span>
          </div>
          <div className="nav-items">
            <div className="nav-item">
              <span className="nav-link" role="link" tabIndex="0">Browse</span>
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
