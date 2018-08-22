import React, { Component } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import './sass/main.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <h1>MERN Music</h1>
        <Footer />
      </div>
    );
  }
}

export default App;
